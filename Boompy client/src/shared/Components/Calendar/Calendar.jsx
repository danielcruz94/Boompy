import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import './Calendar.css'; // Importamos el archivo CSS para estilos del calendario

function FloatingCalendar() {
  const tutorAvailability = [
    { date: new Date(2024, 4, 1), availableTimes: ['10:00', '11:00', '14:00'] },
    { date: new Date(2024, 4, 5), availableTimes: ['09:00', '10:00', '15:00'] },
    { date: new Date(2024, 4, 10), availableTimes: ['11:00', '13:00', '16:00'] },
    { date: new Date(2024, 4, 16), availableTimes: ['09:00', '12:00', '14:00'] },
    { date: new Date(2024, 4, 20), availableTimes: ['10:00', '12:00', '15:00'] },
    { date: new Date(2024, 4, 25), availableTimes: ['09:00', '11:00', '14:00'] },
    { date: new Date(2024, 5, 2), availableTimes: ['10:00', '12:00', '15:00'] },
    { date: new Date(2024, 5, 8), availableTimes: ['09:00', '11:00', '14:00'] },
    { date: new Date(2024, 5, 14), availableTimes: ['10:00', '12:00', '15:00'] },
    { date: new Date(2024, 5, 20), availableTimes: ['09:00', '11:00', '14:00'] },
    { date: new Date(2024, 5, 26), availableTimes: ['10:00', '12:00', '15:00'] },
    { date: new Date(2024, 5, 30), availableTimes: ['09:00', '11:00', '14:00'] }
  ];

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [showOpenButton, setShowOpenButton] = useState(true);

  useEffect(() => {
    Modal.setAppElement('#root'); // Suponiendo que tu punto de entrada es #root
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setModalIsOpen(true);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setShowOpenButton(true);
  };

  const assignClass = () => {
    // Aquí puedes agregar la lógica para verificar si la fecha y hora seleccionadas están disponibles
    console.log("Clase asignada para:", selectedDate.toLocaleDateString(), "a las", selectedTime);
    closeModal();
  };

  const getAvailableDates = () => {
    const currentDate = new Date();
    return tutorAvailability.filter(({ date }) => date >= currentDate).map(({ date }) => date);
  };

  const customClasses = {}; // Objeto para almacenar las clases personalizadas del calendario

  getAvailableDates().forEach(date => {
    // Agregar clase 'available' a las fechas disponibles
    customClasses[date.toLocaleDateString()] = 'available';
  });

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 999 }}>
      {showOpenButton && (
        <button onClick={() => {
          setModalIsOpen(true);
          setShowOpenButton(false);
        }}>Abrir Calendario</button>
      )}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}>
          <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileClassName={({ date }) => {
            const classes = [];
            if (customClasses[date.toLocaleDateString()]) {
              classes.push(customClasses[date.toLocaleDateString()]);
            }
            if (isToday(date)) {
              classes.push('today');
            }
            return classes.join(' ');
          }}
        />
        
        <select value={selectedTime} onChange={handleTimeChange}>
          <option value="">Seleccionar hora</option>
          {tutorAvailability.find(({ date }) => date.getTime() === selectedDate.getTime())?.availableTimes.map((time, index) => (
            <option key={index} value={time}>{time}</option>
          ))}
        </select>
        <div style={{ marginTop: 10 }}>
          <button onClick={assignClass} disabled={!selectedTime}>Asignar Clase</button>
          <button onClick={closeModal}>Cerrar</button>         
        </div>
      </Modal>
    </div>
  );
}

export default FloatingCalendar;