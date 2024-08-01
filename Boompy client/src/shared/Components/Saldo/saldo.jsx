import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './saldo.css'; 

const AttendanceCount = () => {
    const [attendanceCount, setAttendanceCount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtén el estado auth y verifica si está disponible
    const auth = useSelector((state) => state.auth);
    const serverURL = useSelector(state => state.serverURL.url);

    // Verifica que auth y auth.user existan y que el rol sea "Tutor"
    if (!auth || !auth.user || auth.user.role !== 'Tutor') {
        return <p>Access Denied or Loading...</p>;
    }

    // Extrae el multiplicador y el ID de usuario
    const multiplier = extractNumber(auth.user.price || '0');
    const userId = auth.user.id || '0';

    function extractNumber(value) {
        if (!value || value.trim() === '') {
            return 0; 
        }
        const numberString = value.replace(/[^\d.-]/g, '');
        const number = parseFloat(numberString);
        return isNaN(number) ? 0 : number;
    }

    useEffect(() => {
        const fetchAttendanceCount = async () => {
            try {
                if (!serverURL) {
                    throw new Error('Server URL not defined.');
                }

                // Solicitar el conteo de asistencias desde la API
                const response = await axios.get(`${serverURL}/attendance/count/${userId}`);
                const count = response.data.total;

                // Multiplicar el conteo por el multiplicador
                setAttendanceCount(count * multiplier);
            } catch (err) {
                console.error('Error al obtener el conteo de asistencias:', err);
                setError('Error al obtener el conteo de asistencias');
            } finally {
                setLoading(false);
            }
        };

        fetchAttendanceCount();
    }, [multiplier, userId]);

    return (
        <div className="saldocontainer">
            {loading && <p className="status loading">Loading...</p>}
            {error && <p className="status error">{error}</p>}
            {attendanceCount !== null && (
                <>
                    <p className="balance-label">Balance cash:</p>
                    <p className="balance-amount">${multiplier.toFixed(0) + " USD"}</p>
                </>
            )}
        </div>
    );
    
};

export default AttendanceCount;
