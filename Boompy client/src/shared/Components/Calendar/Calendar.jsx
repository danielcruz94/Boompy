import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import './Calendar.css'; // Importamos el archivo CSS para estilos del calendario

function FloatingCalendar() {
  // Supongamos que el tutor tiene algunas horas disponibles predefinidas
  const tutorAvailability = [
    { date: new Date(2024, 4, 15), availableTimes: ['10:00', '11:00', '14:00'] },
    { date: new Date(2024, 4, 16), availableTimes: ['09:00', '10:00', '15:00'] },
    // Puedes agregar más fechas y horas según sea necesario
  ];

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [showOpenButton, setShowOpenButton] = useState(true);

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

  const getAvailableTimesForSelectedDate = () => {
    const selectedDateAvailability = tutorAvailability.find(avail => {
      return avail.date.getTime() === selectedDate.getTime();
    });

    return selectedDateAvailability ? selectedDateAvailability.availableTimes : [];
  };

  const customClasses = {}; // Objeto para almacenar las clases personalizadas del calendario

  tutorAvailability.forEach(({ date }) => {
    // Agregar clase 'available' a las fechas disponibles
    customClasses[date.toLocaleDateString()] = 'available';
  });

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 999 }}>
      {showOpenButton && (
        <button onClick={() => {
          setModalIsOpen(true);
          setShowOpenButton(false);
        }}>Abrir Calendario</button>
      )}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}>
        <h2>Calendario</h2>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileClassName={({ date }) => {
            return customClasses[date.toLocaleDateString()] || '';
          }}
        />
        <select value={selectedTime} onChange={handleTimeChange}>
          <option value="">Seleccionar hora</option>
          {getAvailableTimesForSelectedDate().map((time, index) => (
            <option key={index} value={time}>{time}</option>
          ))}
        </select>
        <div style={{ marginTop: 10 }}>
          <button onClick={closeModal}>Cerrar</button>
          <button onClick={assignClass} disabled={!selectedTime}>Asignar Clase</button>
        </div>
      </Modal>
    </div>
  );
}

export default FloatingCalendar;
