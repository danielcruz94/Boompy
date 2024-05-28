import React, { useState, useEffect } from 'react';
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

  const location = useLocation();

  const lastIndex = location.pathname.lastIndexOf('/');

  const id = location.pathname.substring(lastIndex + 1);

  useEffect(() => {
    Modal.setAppElement('#root');
  
   

    
    const tutorId = id; 


    const fetchTutorAvailability = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/calendar', { params: { userId: tutorId } });
        const filteredAvailability = response.data.filter(availability => availability.reserved === ''); // Filtrar las fechas no reservadas
        setTutorAvailability(filteredAvailability);
       // console.log(filteredAvailability);
      } catch (error) {
        console.error('Error fetching tutor availability:', error);
      }
    };
  
    fetchTutorAvailability();
  }, [reservationSuccess]);

  useEffect(() => {
    if (!scrollEnabled) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [scrollEnabled]);

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
    const reservedValue = userData.id; // ID del estudiante

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
        await axios.put(`http://localhost:3001/api/calendar/reserve/${selectedClass._id}`, { reserved: reservedValue });
        setReservationSuccess(prevState => !prevState);
        const emailData = {
          to: 'daniel94cruz@gmail.com',
          subject: 'Nueva Reserva',
          body: `¡Acabas de Reservar un espacio la app Torii`,
        };

      const sentEmail=  await axios.post('http://localhost:3001/api/email/enviar-email', emailData); // Cambio de estado para forzar la actualización del calendario
      } catch (error) {
        console.error("Error reserving class:", error);
      }
    } else {
      console.error("No class found for the selected date and time.");
    }

    //closeModal();
    setSelectedTime('');
  };

  const getAvailableTimesForDate = (date) => {
    const availabilityForDate = tutorAvailability.filter(availability => new Date(availability.date).getTime() === date.getTime());
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
      customClasses[dateString] = ''; // Eliminar la clase 'available' si no hay tiempos disponibles
    }
  });

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
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
            if (isToday(date)) {
              classes.push('today');
            }
            return classes.join(' ');
          }}
        />

        <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
          <option value="">Select time</option>
          {getAvailableTimesForDate(selectedDate)?.map((time, index) => (
            <option key={index} value={time}>{time}</option>
          ))}
        </select>
        <div style={{ marginTop: 10 }}>
          <button onClick={assignClass} disabled={!selectedTime}>Assign Class</button>
          <button onClick={closeModal}>Close</button>
        </div>
      </Modal>
    </>
  );
}

export default TutorCalendar;
