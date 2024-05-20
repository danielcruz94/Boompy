import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import './Calendar.css'; 

function StudentCalendar({ isOpen, onClose }) {
  const tutorAvailability = [
    { date: new Date(2024, 4, 1), availableTimes: ['10:00'], tutorName: 'Tutor 1' },
    { date: new Date(2024, 4, 5), availableTimes: ['09:00', '10:00', '15:00'], tutorName: 'Tutor 2' },
    { date: new Date(2024, 4, 10), availableTimes: ['11:00', '13:00'], tutorName: 'Tutor 3' },
    { date: new Date(2024, 4, 16), availableTimes: ['12:00', '14:00'], tutorName: 'Tutor 4' },
    { date: new Date(2024, 4, 20), availableTimes: ['10:00', '12:00', '15:00'], tutorName: 'Tutor 5' },
    { date: new Date(2024, 4, 25), availableTimes: ['09:00'], tutorName: 'Tutor 6' },
    { date: new Date(2024, 5, 2), availableTimes: ['12:00'], tutorName: 'Tutor 7' },
    { date: new Date(2024, 5, 8), availableTimes: ['09:00', '11:00', '14:00'], tutorName: 'Tutor 8' },
    { date: new Date(2024, 5, 14), availableTimes: ['15:00'], tutorName: 'Tutor 9' },
    { date: new Date(2024, 5, 20), availableTimes: ['09:00', '11:00', '14:00'], tutorName: 'Tutor 10' },
    { date: new Date(2024, 5, 26), availableTimes: ['15:00'], tutorName: 'Tutor 11' },
    { date: new Date(2024, 5, 30), availableTimes: ['09:00', '11:00', '14:00'], tutorName: 'Tutor 12' }
  ];

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [scrollEnabled, setScrollEnabled] = useState(true); 

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  useEffect(() => {
    if (!scrollEnabled) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [scrollEnabled]);

  const handleDateChange = (date) => {
    const today = new Date();
    if (date.getDate() < today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
      return;
    }

    const availability = tutorAvailability.find(({ date: availabilityDate }) => availabilityDate.getTime() === date.getTime());
    if (availability) {
      setSelectedDate(date);
      setScrollEnabled(false);
    }
  };

  const closeModal = () => {
    onClose();
    setScrollEnabled(true);
  };

  const cancelClass = () => {
    alert('Class canceled');
    closeModal();
  };

  const viewClass = () => {   
    window.location.href = 'http://localhost:5173/calls';
  };

  const getAvailableTimes = () => {
    const availability = tutorAvailability.find(({ date }) => date.getTime() === selectedDate.getTime());
    return availability ? availability.availableTimes : [];
  };

  const customClasses = {};

  tutorAvailability.forEach(({ date, availableTimes }) => {
    customClasses[date.toLocaleDateString()] = availableTimes.length > 0 ? 'available' : '';
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
        locale="en-US" // Se establece el idioma en inglés
      />

      <div className="close-button-container" style={{ marginTop: 10 }}>
        <button onClick={closeModal}>Close</button>         
      </div>

      {getAvailableTimes().length > 0 && (
        <div className="class-info">
          <p>{selectedDate.toLocaleDateString('en-US')}</p> {/* Traducción del formato de fecha */}
          <p>Tutor: {tutorAvailability.find(({ date }) => date.getTime() === selectedDate.getTime()).tutorName}</p>
          <p>Times:</p>
          <div className="times-list">
            {getAvailableTimes().map((time, index) => (
              <span key={index} className="class-time">{time}</span>
            ))}
          </div>
          <button onClick={cancelClass}>Cancel Class</button>
          <button onClick={viewClass}>View Class</button>
        </div>
      )}
    </Modal>
  );
}

export default StudentCalendar;
