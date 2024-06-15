import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import './Calendar.css';

function TutorCalendar() {
  const [tutorAvailability, setTutorAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [showOpenButton, setShowOpenButton] = useState(true);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [reservationSuccess, setReservationSuccess] = useState(false);

  const serverURL = useSelector(state => state.serverURL.url);
  const location = useLocation();
  const lastIndex = location.pathname.lastIndexOf('/');
  const id = location.pathname.substring(lastIndex + 1);

  useEffect(() => {
    Modal.setAppElement('#root');
    fetchTutorAvailability();
    // Iniciar intervalo para actualización automática cada 5 minutos (300000 ms)
    const interval = setInterval(fetchTutorAvailability, 30); // 5 minutos

    return () => clearInterval(interval); // Limpiar intervalo al desmontar el componente
  }, [reservationSuccess]);

  useEffect(() => {
    if (!scrollEnabled) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [scrollEnabled]);

  const fetchTutorAvailability = async () => {
    try {
      const response = await axios.get(`${serverURL}/calendar/${id}`);
      const availabilityData = response.data.filter(avail => avail.reserved === "");

      const processedAvailabilityData = availabilityData.map(avail => {
        const startDateTime = new Date(avail.startTime);
        const endDateTime = new Date(avail.endTime);
        
        const startTimeLocal = startDateTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        const endTimeLocal = endDateTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        
        // Filtrar las clases que aún no han comenzado
        if (startDateTime > new Date()) {
          return {
            ...avail,
            startTime: startTimeLocal,
            endTime: endTimeLocal
          };
        } else {
          return null; // Excluir las clases que ya han comenzado
        }
      }).filter(Boolean); // Eliminar elementos nulos del array
      
      setTutorAvailability(processedAvailabilityData);
      
    } catch (error) {
      console.error('Error fetching tutor availability:', error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setModalIsOpen(true);
    setScrollEnabled(false);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setShowOpenButton(true);
    setScrollEnabled(true);
  };

  const assignClass = async () => {
    const userDataString = localStorage.getItem('userData');
    const userData = JSON.parse(userDataString);
    const reservedValue = userData.id;

    const selectedClass = tutorAvailability.find(availability => {
      const availabilityDate = new Date(availability.date).toLocaleDateString();
      const availabilityTime = `${availability.startTime} --- ${availability.endTime}`;
      return availabilityDate === selectedDate.toLocaleDateString() && availabilityTime === selectedTime;
    });

    if (selectedClass) {
      const newClassData = {
        date: selectedClass.date,
        startTime: selectedClass.startTime,
        endTime: selectedClass.endTime,
        userId: selectedClass.userId,
        classId: selectedClass._id,
        reserved: reservedValue 
      };

      try {
        const response = await axios.put(`${serverURL}/calendar/reserve/${selectedClass._id}`, { reserved: reservedValue });
        setReservationSuccess(prevState => !prevState);

        if (response.status === 201) {
          // Crear constantes temporales para almacenar los valores formateados
          const formattedDate = new Date(selectedClass.date).toLocaleString('en-US', {
            day: 'numeric',
            month: 'long', // 'long' para mostrar el nombre completo del mes en inglés
            year: 'numeric'
          });
      
          const formattedStartTime = new Date(selectedClass.startTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
          const formattedEndTime = new Date(selectedClass.endTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      
          // Datos del correo electrónico
          const emailContent = `
            <html>
            <body>
              <h1 style="color: #007bff;">¡Tu Clase ha sido Reservada Exitosamente!</h1>
              <p>¡Hola ${userData.name}!</p>
              <p>Tu clase ha sido reservada para el ${formattedDate}, desde las ${formattedStartTime} hasta las ${formattedEndTime}.</p>
              <p>Por favor, asegúrate de estar preparado para tu clase y estar a tiempo.</p>
              <p>¡Gracias por elegirnos para tu aprendizaje!</p>
              <p>Saludos,<br/>El equipo de Torii</p>
            </body>
            </html>
          `;
      
          const emailData = {
            to: userData.email, 
            subject: 'Confirmación de Reserva de Clase',
            html: emailContent
          };
      
          // Envío de correo electrónico
          const sentEmail = await axios.post(`${serverURL}/email/enviar-email`, emailData);
          closeModal();
        } else {
          throw new Error("Error al enviar los datos al servidor. Por favor, intente nuevamente.");
        }
      } catch (error) {
        console.error("Error reserving class:", error);
      }
    } else {
      console.error("No class found for the selected date and time.");
    }

    setScrollEnabled(true);
    setSelectedTime('');
  };

  const getAvailableTimesForDate = (date) => {
    const availabilityForDate = tutorAvailability.filter(availability => new Date(availability.date).toLocaleDateString() === date.toLocaleDateString());
    if (availabilityForDate.length > 0) {
      return availabilityForDate.map(availability => `${availability.startTime} --- ${availability.endTime}`);
    } else {
      return [];
    }
  };

  const customClasses = {};
  tutorAvailability.forEach(({ date }) => {
    const dateString = new Date(date).toLocaleDateString();
    customClasses[dateString] = 'available';
    if (!getAvailableTimesForDate(new Date(date)).length) {
      customClasses[dateString] = ''; 
    }
  });

  const isClassPassed = (classDateTime) => {
    return new Date(classDateTime) < new Date();
  };

  return (
    <>
      {showOpenButton && (
        <button onClick={() => {
          setModalIsOpen(true);
          setShowOpenButton(false);
          setScrollEnabled(false);
        }} style={{marginTop:'15px',background:'#10104d',color:'white'}}>Book a Place</button>
      )}

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          locale="en-US"
          tileClassName={({ date }) => {
            const dateString = date.toLocaleDateString();
            const classes = [];
            if (customClasses[dateString]) {
              classes.push(customClasses[dateString]);
            }
            if (isClassPassed(dateString)) {
              classes.push('past-class');
            }
            return classes.join(' ');
          }}
        />

        <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
          <option value="">Select time</option>
          {getAvailableTimesForDate(selectedDate).map((time, index) => (
            <option key={index} value={time}>{time}</option>
          ))}
        </select>
        <div style={{ marginTop: 10 }}>
          <button onClick={assignClass} disabled={!selectedTime} className="assign-class-btn">Assign Class</button>  
          <button onClick={closeModal} className="close-btn">Close</button>
        </div>
      </Modal>
    </>
  );
}

export default TutorCalendar;
