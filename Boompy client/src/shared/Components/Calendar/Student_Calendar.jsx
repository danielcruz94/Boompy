import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import axios from 'axios';
import './Calendar.css'; 

function StudentCalendar({ isOpen, onRequestClose, onClose }) {
  const [tutorAvailability, setTutorAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [scrollEnabled, setScrollEnabled] = useState(true); 

  const userDataString = localStorage.getItem('userData');
  const userData = JSON.parse(userDataString);
  const studentId = userData.id; 

  useEffect(() => {
    Modal.setAppElement('#root');
    const fetchStudentCalendarClasses = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/calendar/classes/${studentId}`);
        setTutorAvailability(response.data.map(item => ({
          ...item,
          startTime: new Date(item.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
          endTime: new Date(item.endTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
        })));
        
      } catch (error) {
        console.error('Error fetching student calendar classes:', error);
      }
    };
  
    fetchStudentCalendarClasses();
  }, [studentId]);

  useEffect(() => {
    if (!scrollEnabled) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [scrollEnabled]);

  const handleDateChange = (date) => {
    const today = new Date();
    if (date.getDate() < today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
      return;
    }

    const availability = tutorAvailability.find(({ date: availabilityDate }) => new Date(availabilityDate).getTime() === date.getTime());
    if (availability) {
      setSelectedDate(date);
      setScrollEnabled(false);
    }
  };

  const closeModal = () => {
    onClose();
    onRequestClose();
    setScrollEnabled(true);
  };

  const cancelClass = () => {
    alert('Clase cancelada');
    closeModal();
  };

  const viewClass = () => {   
    window.location.href = 'http://localhost:5173/calls';
  };

  const getAvailableTimes = () => {
    const availability = tutorAvailability.find(item => {
      const itemDate = new Date(item.date);
      return itemDate.toDateString() === selectedDate.toDateString();
    });
  
    return availability ? `${availability.startTime} - ${availability.endTime}` : '';
  };

  const customClasses = {};

  tutorAvailability.forEach(({ date }) => {
    customClasses[new Date(date).toLocaleDateString()] = 'available';
  });

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const tileClassName = ({ date }) => {
    const classes = [];
    if (!isToday(date) && date < new Date()) {
      return '';
    }
    if (customClasses[date.toLocaleDateString()]) {
      classes.push(customClasses[date.toLocaleDateString()]);
    }
    if (isToday(date)) {
      classes.push('today');
    }
    return classes.join(' ');
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={tileClassName} 
        locale="en-US" // Cambiar a inglés
      />

      <div className="close-button-container" style={{ marginTop: 10 }}>
        <button onClick={closeModal}>Cerrar</button>         
      </div>

      {getAvailableTimes() && (
        <div className="class-info">
          <p>{selectedDate.toLocaleDateString()}</p>
          <p>Horario: {getAvailableTimes()}</p>
          <button onClick={cancelClass}>Cancelar Clase</button>
          <button onClick={viewClass}>Ver Clase</button>
        </div>
      )}
    </Modal>
  );
}

export default StudentCalendar;
