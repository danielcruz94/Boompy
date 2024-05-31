import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import './Calendar.css'; 
import axios from 'axios'; 

function CalendarClass({ isOpen, onRequestClose, onClose }) {

  const [tutorAvailability, setTutorAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(isOpen);
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const [scrollEnabled, setScrollEnabled] = useState(true); 

  const userDataString = localStorage.getItem('userData');
  const userData = JSON.parse(userDataString);

  useEffect(() => {
    Modal.setAppElement('#root');
    setModalIsOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (!scrollEnabled) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [scrollEnabled]);

  const fetchDataAndSetAvailability = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/calendar', { params: { userId: userData.id } });
      setTutorAvailability(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setScrollEnabled(false); 
  };

  const closeModal = (event) => {
    document.body.style.overflow = 'auto';
    if (event?.target?.id === "closeButton") {
      setModalIsOpen(false);
      setScrollEnabled(true);
      if (typeof onRequestClose === 'function') {
        onRequestClose();
        if (typeof onClose === 'function') {
          onClose();
        }
      }
    }
  };
  fetchDataAndSetAvailability();

  
  const assignClass = async () => {
    try {
        const currentDate = new Date();
        const selectedDateTime = selectedDate.getTime();
        const currentDateTime = currentDate.getTime();

        console.log(selectedStartTime)

        console.log(selectedDateTime)
        console.log(currentDateTime)













        
        

        if (selectedDateTime <= currentDateTime) {
          
            throw new Error("Fecha no válida. Por favor, seleccione una fecha posterior a hoy.");
        }

        // Parsea las horas seleccionadas en el formato de 12 horas a un objeto Date
        const startTimeParts = selectedStartTime.split(' ');
        const endTimeParts = selectedEndTime.split(' ');

        let startHour = parseInt(startTimeParts[0].split(':')[0], 10);
        let endHour = parseInt(endTimeParts[0].split(':')[0], 10);

        if (startTimeParts[1] === 'PM') startHour += 12;
        if (endTimeParts[1] === 'PM') endHour += 12;

        const startDate = new Date(selectedDate);
        startDate.setHours(startHour);
        const endDate = new Date(selectedDate);
        endDate.setHours(endHour);

        // Convierte las horas a UTC
        const startTimeUTC = startDate.toUTCString();
        const endTimeUTC = endDate.toUTCString();

        const classData = {
            userId: userData.id,
            date: selectedDate,
            startTime: startTimeUTC,
            endTime: endTimeUTC,
            reserved: ""
        };

        const response = await axios.post('http://localhost:3001/api/calendar', classData);

        if (response.status === 201) {
          // 'daniel94cruz@gmail.com'
          // La clase se agregó con éxito
         // fetchDataAndSetAvailability();

         setTimeout(fetchDataAndSetAvailability, 20000); // 10000 milisegundos = 10 segundos
// Crear constantes temporales para almacenar los valores formateados
        const formattedDate = new Date(selectedDate).toLocaleString('en-US', {
          day: 'numeric',
          month: 'long', // 'long' para mostrar el nombre completo del mes en inglés
          year: 'numeric'
        });

        const formattedStartTime = new Date(startTimeUTC).toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
        const formattedEndTime = new Date(endTimeUTC).toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});

        console.log(userData.email)
          
        const emailData = {
          to: userData.email,
          subject: 'Torii Availability Update',
          body: `holaghbhbjhbhjbhjbhjbjknkjbkjbhjbhj`,
      };
      
      
        // const sentEmail = await axios.post('http://localhost:3001/api/email/enviar-email', emailData);
          //closeModal();
      } else {
          throw new Error("Error al enviar los datos al servidor. Por favor, intente nuevamente.");
      }
      
    } catch (error) {
        console.error('Error al enviar los datos al servidor:', error.message);
        alert(error.message || "Error al enviar los datos al servidor. Por favor, intente nuevamente.");
    }
};


  const getAvailableDates = () => {
    const currentDate = new Date();
    return tutorAvailability.filter(({ date }) => new Date(date) >= currentDate).map(({ date }) => new Date(date));
  };

  const customClasses = {}; 

  getAvailableDates().forEach(date => {
    customClasses[date.toLocaleDateString()] = 'available';
  });

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const availableHoursForDate = tutorAvailability.filter(({ date }) => {
    return new Date(date).getDate() === selectedDate.getDate() &&
           new Date(date).getMonth() === selectedDate.getMonth() &&
           new Date(date).getFullYear() === selectedDate.getFullYear();
  });

  const hoursOptions = [];
  for (let i = 0; i < 24; i++) {
    let hour = (i % 12 || 12).toString();
    if (hour.length === 1) {
      hour = '0' + hour; 
    }
    hour += ':00 ' + (i < 12 ? 'AM' : 'PM');
    hoursOptions.push(hour);
  }
  
  const viewReservedClassDetails = (startTime, endTime, classId) => {
    console.log(classId);
  
    const currentTime = new Date();
  
    // Convertir las cadenas de tiempo de UTC a objetos de fecha
    const startTimeUTC = new Date(startTime);
    const endTimeUTC = new Date(endTime);
  
    // Convertir la hora actual a la zona horaria local
    const currentTimeLocal = new Date(currentTime.toLocaleString('en-US', { timeZone: 'America/Bogota' }));
  
    // Convertir las fechas UTC a la hora local
    const startTimeLocal = new Date(startTimeUTC.toLocaleString('en-US', { timeZone: 'America/Bogota' }));
    const endTimeLocal = new Date(endTimeUTC.toLocaleString('en-US', { timeZone: 'America/Bogota' }));
  
    // Comprobar si la hora actual está dentro del intervalo de la clase
    if (currentTimeLocal >= startTimeLocal && currentTimeLocal <= endTimeLocal) {
      const url = `http://localhost:5173/calls/${classId}`;
      window.location.href = url;
    } else {
      alert('Clase no disponible en este momento....');
      
      console.log("La primera hora local: " + currentTimeLocal);
console.log("Segunda hora inicio: " + startTimeLocal);
console.log("Hora fin: " + endTimeLocal);

    }
  };
  
  
  
  
  
  
  


  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        locale="en-US"
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
      
      <div>
        <p>Available Hours for {selectedDate.toLocaleDateString()}</p>
        <ul>
          
        {availableHoursForDate.map(({ _id, startTime, endTime, reserved }, index) => (
          
  <li key={index} className={reserved ? 'reserved' : ''}>
    {new Date(startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} - {new Date(endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
    {reserved && (
     <button className="view-class-button" onClick={() => viewReservedClassDetails(startTime, endTime, _id)}>Ver clase</button>
    )}
  </li>
))}
        </ul>
      </div>

      <div>
        <div>
          <label>Start Time:</label>
          <select className="start-time-select" value={selectedStartTime} onChange={(e) => setSelectedStartTime(e.target.value)}>
            <option value="">Select time</option>
            {hoursOptions.map((time, index) => (
              <option key={index} value={time}>{time}</option>
            ))}
          </select>
        </div>

        <div>
          <label>End Time:</label>
          <select className="end-time-select" value={selectedEndTime} onChange={(e) => setSelectedEndTime(e.target.value)} disabled={!selectedStartTime}>
            <option value="">Select time</option>
            {hoursOptions.map((time, index) => {
              const startIndex = hoursOptions.findIndex(option => option === selectedStartTime);
              const disabled = index <= startIndex;
              return <option key={index} value={time} disabled={disabled}>{time}</option>;
            })}
          </select>
        </div>

        <div style={{ marginTop: 10 }}>
          <button className="assign-class-button" onClick={assignClass} disabled={!selectedStartTime || !selectedEndTime}>Assign Class</button>
          <button id="closeButton" onClick={closeModal}>Close</button>         
        </div>
      </div>
    </Modal>
  );
}

export default CalendarClass;
