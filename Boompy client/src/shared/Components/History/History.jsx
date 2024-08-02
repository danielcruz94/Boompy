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

                    const filteredUsers = getFilteredUsers(data.users, role); // Filtra los usuarios

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
                    console.error('Error al obtener datos de asistencias:', err);
                    setError('Error al obtener datos de asistencias');
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
            month: 'long', // Usa 'short' para abreviar el mes (e.g., "Jul" en vez de "July")
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true // Usa formato de 12 horas (cambia a false para formato de 24 horas)
        };
    
        return date.toLocaleString('en-US', options); // Configura el locale a inglés
    };

    const convertStartTime = (utcTime) => {
        const date = new Date(utcTime);
    
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true // Usa formato de 12 horas (cambia a false para formato de 24 horas)
        };
    
        return date.toLocaleTimeString('en-US', options); // Configura el locale a inglés
    };

    const getFilteredUsers = (users, role) => {
        return users.filter(user => user.role !== role);
    };


    return (
        <div>
            <div className="settings-icon" onClick={openModal}>
                <i className="fa fa-clock IconNavbar" />
            </div>
            {showModal && (
                <Modal
                    isOpen={showModal}
                    onRequestClose={closeModal}
                    contentLabel="Attendance Modal"
                    onScroll={handleScroll}
                    className="modalHistory"
                >
                    <h2>Support Details</h2>
                    <button onClick={closeModal} className="close">X</button>

                    {loading && <p>loading...</p>}
                    {error && <p>{error}</p>}

                    {attendances.length > 0 && (
                        <>
                           {role === 'Tutor' && (
                                <p>Total balance: ${total.toFixed(2) + " USD"}</p>
                            )}
                            <ul>
                                {paginatedAttendances().map((attendance, index) => (
                                    <li className='date_class' key={index}>
                                        <p>Class Date: {attendance.calendarClass.date ? convertUTCToLocal(attendance.calendarClass.date) : 'No disponible'}</p>
                                        <p>Start Time: {attendance.calendarClass.startTime ? convertStartTime(attendance.calendarClass.startTime) : 'No disponible'}</p>
                                        <p>Connection: {convertUTCToLocal(attendance.timestamp)}</p>        
                                        <p>
                                            {attendance.user.name && attendance.user.lastName ? 
                                                `${attendance.user.role}: ${attendance.user.name} ${attendance.user.lastName}` 
                                                : 'No disponible'}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                            {attendances.length > (currentPage * itemsPerPage) && (
                                <button onClick={loadMore}>Cargar más</button>
                            )}
                        </>
                    )}

                    {attendances.length === 0 && !loading && <p>No se encontraron asistencias.</p>}
                </Modal>
            )}
        </div>
    );
};

export default AttendanceModal;
