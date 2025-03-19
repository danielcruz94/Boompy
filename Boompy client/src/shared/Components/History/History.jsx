import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import './History.css'; // Asegúrate de tener estilos para el modal

Modal.setAppElement('#root');

const AttendanceModal = ({ userId, price }) => {
    const [showModal, setShowModal] = useState(false);
    const [attendances, setAttendances] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);
    const [roleuser, setRoleuser] = useState(null); // Estado para roleuser

    const serverURL = useSelector(state => state.serverURL.url);
    const userDataString = localStorage.getItem('userData');
    const userData = JSON.parse(userDataString);
    const role = userData.role;

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        if (showModal) {
            const fetchAttendances = async () => {
                try {
                   
                    const response = await axios.get(`${serverURL}/attendances/${userId}`);
                    const data = response.data;

                    const calendarClassesMap = data.calendarClasses.reduce((map, cal) => {
                        map[cal._id] = cal;
                        return map;
                    }, {});

                    const usersMap = data.users.reduce((map, user) => {
                        map[user.id] = user;
                        return map;
                    }, {});

                    const filteredUsers = getFilteredUsers(data.users, role);
                    const roleuser = filteredUsers[0]; 
                    setRoleuser(roleuser); 

                    const updatedAttendances = data.attendances.map(attendance => {
                        const calendarClass = calendarClassesMap[attendance.eventId] || {};
                        const user = usersMap[calendarClass.reserved] || {};

                        return {
                            ...attendance,
                            calendarClass,
                            user
                        };
                    });

                    setAttendances(updatedAttendances);
                    setTotal(data.total * price);
                    setLoading(false);
                } catch (err) {
                    console.error('Error fetching attendance data:', err);
                    setError('');

                    setLoading(false);
                }
            };

            fetchAttendances();
        }
    }, [userId, showModal, price, serverURL, role]);

    const handleScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.target;
        if (scrollHeight - scrollTop === clientHeight) {
            loadMore();
        }
    };

    const paginatedAttendances = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return attendances.slice(startIndex, endIndex);
    };

    const loadMore = () => {
        if ((currentPage * itemsPerPage) < attendances.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const convertUTCToLocal = (utcDate) => {
        const date = new Date(utcDate);

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };

        return date.toLocaleString('en-US', options);
    };

    const formatUTCDateToLocal = (utcDate) => {
        const date = new Date(utcDate);
    
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
    
        return date.toLocaleString('en-US', options);
    };

    const convertStartTime = (utcTime) => {
        const date = new Date(utcTime);

        const options = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };

        return date.toLocaleTimeString('en-US', options);
    };

    const getFilteredUsers = (users, role) => {
        return users.filter(user => user.role !== role);
    };

    return (
        <div>
            <div className="settings-icon"  id="History" onClick={openModal}>  
                
                <div>
                <i className="fa fa-clock IconNavbar" />
              
                </div>
            </div>


            {showModal && (
                <Modal
                    isOpen={showModal}
                    onRequestClose={closeModal}
                    contentLabel="Attendance Modal"
                    onScroll={handleScroll}
                    className="modalHistory"
                >
                    <h2>Hitorial de Clases</h2>
                    <button onClick={closeModal} className="close">X</button>

                    {loading && <p>loading...</p>}
                    {error && <p>{error}</p>}

                    {attendances.length > 0 && (
                        <>
                            {role === 'Tutor' && (
                                <p>Total Ingresos: ${total.toFixed(2) + " USD"}</p>
                            )}
                            <ul>
                                {paginatedAttendances().map((attendance, index) => (
                                    <li className='date_class' key={index}>
                                        <p>Fecha De Clase: {attendance.calendarClass.date ? formatUTCDateToLocal(attendance.calendarClass.date) : 'No disponible'}</p>
                                        <p>Hora Inicio: {attendance.calendarClass.startTime ? convertStartTime(attendance.calendarClass.startTime) : 'No disponible'}</p>
                                        <p>Conexion: {convertUTCToLocal(attendance.timestamp)}</p>        
                                        <p>
                                            {roleuser && roleuser.name && roleuser.lastName
                                                ? `${roleuser.role}: ${roleuser.name} ${roleuser.lastName}`
                                                : 'No disponible'}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                            {attendances.length > (currentPage * itemsPerPage) && (
                                <button onClick={loadMore}>loading...</button>
                            )}
                        </>
                    )}

                    {attendances.length === 0 && !loading && <p>No assists found.</p>}
                </Modal>
            )}
        </div>
    );
};

export default AttendanceModal;
