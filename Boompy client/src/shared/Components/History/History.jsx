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
                    console.log(response.data);

                    const data = response.data;
                    const calendarClassesMap = data.calendarClasses.reduce((map, cal) => {
                        map[cal._id] = cal;
                        return map;
                    }, {});
                    
                    const usersMap = data.users.reduce((map, user) => {
                        map[user.id] = user;
                        return map;
                    }, {});

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
    }, [userId, showModal, price, serverURL]);

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
        return date.toLocaleString(); // Para mostrar fecha y hora en la zona horaria local
    };

    const convertStartTime = (utcTime) => {
        const date = new Date(utcTime);
        return date.toLocaleTimeString(); // Para mostrar solo la hora en la zona horaria local
    };

    return (
        <div>
            <div className="settings-icon" onClick={openModal}>
            <i className="fa fa-cog IconNavbar" />
            </div>
            {showModal && (
                <Modal
                    isOpen={showModal}
                    onRequestClose={closeModal}
                    contentLabel="Attendance Modal"
                    onScroll={handleScroll}
                    className="modal"
                >
                    <h2>Detalles de Asistencia</h2>
                    <button onClick={closeModal} className="close">Cerrar</button>

                    {loading && <p>Cargando...</p>}
                    {error && <p>{error}</p>}

                    {attendances.length > 0 && (
                        <>
                            <p>Saldo Total: ${total.toFixed(2)}</p>
                            <ul>
                                {paginatedAttendances().map((attendance, index) => (
                                    <li key={index}>
                                        <p>Timestamp: {convertUTCToLocal(attendance.timestamp)}</p>
                                        <p>Fecha de Clase: {attendance.calendarClass.date ? convertUTCToLocal(attendance.calendarClass.date) : 'No disponible'}</p>
                                        <p>Hora de Inicio: {attendance.calendarClass.startTime ? convertStartTime(attendance.calendarClass.startTime) : 'No disponible'}</p>
                                        <p>Tutor: {attendance.user.name && attendance.user.lastName ? `${attendance.user.name} ${attendance.user.lastName}` : 'No disponible'}</p>
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
