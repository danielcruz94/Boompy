// UserPoints.js
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';

import './points.css';

const UserPoints = () => {
  const [points, setPoints] = useState(null);

  const serverURL = useSelector(state => state.serverURL.url);
 

  const fetchPoints = async () => {
    try {
      const userDataString = localStorage.getItem('userData');
      const userData = JSON.parse(userDataString);
      const studentId = userData.id;

      const response = await axios.get(`${serverURL}/users/${studentId}/points`);
      setPoints(response.data.points);
    } catch (error) {
      //console.log("error")
    } finally {
       // console.log("error")
    }
  };

  useEffect(() => {
    fetchPoints();
    const intervalId = setInterval(fetchPoints, 5000); // Consultar cada 5 segundos

    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
  }, []);

  

  return (
    <span className='points'>{points !== null ? `Points: ${points}` : 'points: 0'}</span>
  );
};

export default UserPoints;
