import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './saldo.css'; 

const AttendanceCount = () => {
    const [attendanceCount, setAttendanceCount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userDataString = localStorage.getItem('userData');
    const userData = JSON.parse(userDataString);
   
    const auth = useSelector((state) => state.auth);
    const serverURL = useSelector(state => state.serverURL.url);
    
    const multiplier = extractNumber(auth?.user?.price || '0');
    const userId = auth?.user?.id || '0';

    function extractNumber(value) {
        if (!value || value.trim() === '') {
            return 0; 
        }
        const numberString = value.replace(/[^\d.-]/g, '');
        const number = parseFloat(numberString);
        return isNaN(number) ? 0 : number;
    }

    const isAuthorized = auth && auth.user && auth.user.role === 'Tutor';
    

    useEffect(() => {
        if (!isAuthorized || !serverURL) {
            setError('Access Denied or Server URL not defined.');
            setLoading(false);
            return;
        }

        const fetchAttendanceCount = async () => {
            try {                
                const response = await axios.get(`${serverURL}/attendances/count/${userId}`);
                const count = response.data.total;               
               
                setAttendanceCount(count * multiplier);
            } catch (err) {
                console.error('Error al obtener el conteo de asistencias:', err);
                setError('Error al obtener el conteo de asistencias');
            } finally {
                setLoading(false);
            }
        };

        fetchAttendanceCount();
    }, [isAuthorized, userId, multiplier]);   

 
        return (
            <>
                {userData.role === 'Tutor' && (
                    <div className="saldocontainer">
                        {loading && <p className="status loading">Loading...</p>}
                        {error && <p className="balance-label">$0 USD</p>}
                        {attendanceCount !== null && !loading && !error && (
                            <>
                                <p className="balance-label">Balance cash:</p>
                                <p className="balance-amount">${attendanceCount.toFixed(0) + " USD"}</p>
                            </>
                        )}
                    </div>
                )}
            </>
        );
   
};

export default AttendanceCount;
