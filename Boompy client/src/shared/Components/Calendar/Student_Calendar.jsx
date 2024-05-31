import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import axios from 'axios';
import './Calendar.css'; 

function StudentCalendar({ isOpen, onRequestClose, onClose }) {
  const [tutorAvailability, setTutorAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [scrollEnabled, setScrollEnabled] = useState(true); 
  const [selectedClasses, setSelectedClasses] = useState([]);

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

  useEffect(() => {
    if (isOpen) {
      const todayClasses = tutorAvailability.filter(({ date }) => {
        const currentDate = new Date();
        const classDate = new Date(date);
        return classDate.getDate() === currentDate.getDate() &&
               classDate.getMonth() === currentDate.getMonth() &&
               classDate.getFullYear() === currentDate.getFullYear();
      });
      setSelectedClasses(todayClasses);
    }
  }, [isOpen, tutorAvailability]);

  const handleDateChange = (date) => {
    const today = new Date();
    if (date.getDate() < today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
      return;
    }

    const availability = tutorAvailability.filter(({ date: availabilityDate }) => new Date(availabilityDate).getTime() === date.getTime());
    setSelectedClasses(availability);
    setSelectedDate(date);
    setScrollEnabled(false);
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

  const viewClass = (startTime, endTime, classId) => {   

    console.log(classId);   

    const currentTime = new Date();
    
    const [startHour, startMinute] = startTime.replace('AM', '').replace('PM', '').split(':').map(Number);
    let adjustedStartHour = startHour;
    if (startTime.includes('PM') && startHour !== 12) {
        adjustedStartHour += 12;
    } else if (startHour === 12 && startTime.includes('AM')) {
        adjustedStartHour = 0; 
    }

    const [endHour, endMinute] = endTime.replace('AM', '').replace('PM', '').split(':').map(Number);
    let adjustedEndHour = endHour;
    if (endTime.includes('PM') && endHour !== 12) {
        adjustedEndHour += 12;
    } else if (endHour === 12 && endTime.includes('AM')) {
        adjustedEndHour = 0; 
    }

    
    const classStartTime = new Date();
    classStartTime.setHours(adjustedStartHour, startMinute, 0);
    const classEndTime = new Date(classStartTime);
    classEndTime.setHours(adjustedEndHour, endMinute, 0);

    
    if (currentTime >= classStartTime && currentTime <= classEndTime) {
        const url = `http://localhost:5173/calls/${classId}`;
        window.location.href = url;
    } else {
        alert('Clase no disponible en este momento.');
    }
};


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
    if (tutorAvailability.find(({ date: availabilityDate }) => new Date(availabilityDate).getTime() === date.getTime())) {
      classes.push('available');
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

      {selectedClasses.length > 0 && (
        selectedClasses.map((classInfo, index) => (
          <div key={index} className="class-info">
            <p>{new Date(classInfo.date).toLocaleDateString()}</p>
            <p>Horario: {classInfo.startTime} - {classInfo.endTime}</p>            
            <button className="cancelButton" onClick={() => cancelClass()}>Cancelar Clase</button>
            <button className="viewButton" onClick={() => viewClass(classInfo.startTime, classInfo.endTime, classInfo._id)}>Ver Clase</button>

          </div>
        ))
      )}
    </Modal>
  );
}

export default StudentCalendar;
