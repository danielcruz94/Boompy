import { useState, useEffect } from 'react';
import { useSelector } from "react-redux"
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import './Calendar.css'; 
import axios from 'axios'; 
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import {formatDateToSpanish}from '../../utils/funtions'

function CalendarClass({ isOpen, onRequestClose, onClose }) {

  const [tutorAvailability, setTutorAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(isOpen);
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');

  const [scrollEnabled, setScrollEnabled] = useState(true);   


  const serverURL = useSelector(state => state.serverURL.url);
  const callsActive = useSelector((state) => state.callsActive);

  const userDataString = localStorage.getItem('userData');
  const userData = JSON.parse(userDataString);

 // console.log("url"+serverURL)

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
      const response = await axios.get(`${serverURL}/calendar`, { params: { userId: userData.id } });   
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
        
      
        // Parsea las horas seleccionadas en el formato de 12 horas a un objeto Date
        const startTimeParts = selectedStartTime.split(' ');
        const endTimeParts = selectedEndTime.split(' ');
      
        let startHour = parseInt(startTimeParts[0].split(':')[0], 10);
        let endHour = parseInt(endTimeParts[0].split(':')[0], 10);

        // console.log(startTimeParts[1].toLowerCase())
        // console.log(endTimeParts[1].toLowerCase())
      
        // Verifica si es PM y ajusta la hora en consecuencia
        if (startTimeParts[1].toLowerCase() === 'pm' && startHour !== 12) {
            startHour += 12;
        }
      
        if (endTimeParts[1].toLowerCase() === 'pm' && endHour !== 12) {
            endHour += 12;
        }

    
      
        selectedDate.setHours(startHour);
        selectedDate.setMinutes(0);             
    
      
        const startDate = new Date(selectedDate);
        startDate.setHours(startHour);
        const startTimeUTC = startDate.toISOString();

        let endTimeUTC;
        if (endTimeParts[1].toLowerCase() === 'am' && endHour === 12) {
          const endDate = new Date(selectedDate);
          endDate.setDate(endDate.getDate() + 1); 
          endDate.setHours(0, 0, 0, 0); 
          endTimeUTC = endDate.toISOString();
      } else {
          const endDate = new Date(selectedDate);
          endDate.setHours(endHour);
          endTimeUTC = endDate.toISOString();
      }
        
      
        const classData = {
            userId: userData.id,
            date: selectedDate,
            startTime: startTimeUTC,
            endTime: endTimeUTC,
            reserved: ""
        };


        const response = await axios.post(`${serverURL}/calendar`, classData);

     
       
      
        if (response.status === 201 || response.status === 200) {
            // Esperar 20 segundos antes de ejecutar fetchDataAndSetAvailability
            setTimeout(fetchDataAndSetAvailability, 20000);
          
            // Crear constantes temporales para almacenar los valores formateados
            const formattedDate = new Date(selectedDate).toLocaleString('en-US', {
                day: 'numeric',
                month: 'long', // 'long' para mostrar el nombre completo del mes en inglés
                year: 'numeric'
            });
          
            const formattedStartTime = new Date(startTimeUTC).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            const formattedEndTime = new Date(endTimeUTC).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
          
            console.log(userData.email);
          
            // Datos del correo electrónico
            const emailContent = `
                <html>
                <body>
                    <h1 style="color: #007bff;">¡Tu Disponibilidad ha sido Programada Exitosamente!</h1>
                    <p>¡Hola ${userData.name}!</p>
                    <p>Tu disponibilidad para dar clases ha sido programada para el ${formattedDate}, desde las ${formattedStartTime} hasta las ${formattedEndTime}.</p>
                    <p>Recuerda estar preparado para tus clases y ofrecer una gran experiencia educativa.</p>
                    <p>¡Gracias por ser parte de nuestro equipo de tutores!</p>
                    <p>Saludos,<br/>El equipo de Torii</p>
                </body>
                </html>
            `;
          
            const emailData = {
                to: userData.email,
                subject: 'Torii Availability Update',
                text: emailContent
            };
          
            // Envío de correo electrónico
          //  const sentEmail = await axios.post(`${serverURL}/email/enviar-email`, emailData);
           
             Swal.fire({
                icon: 'success',
                title: '¡Horario actualizado exitosamente!',
                text: '¡Buenas noticias! Su horario ya esta disponible para ser reservado.',

            }).then(() => {
              //closeModal(); // Cierra el modal después de que el usuario confirme la alerta
            });
             
          
        } else {

          Swal.fire({
            icon: 'error',
           // title: '¡Horario actualizado exitosamente!',
            text: response.data.message,

        }).then(() => {
          //closeModal(); // Cierra el modal después de que el usuario confirme la alerta
        });
           
            throw new Error("Error al enviar los datos al servidor. Por favor, intente nuevamente.");
        }
      

      
    } catch (error) {
        console.error('Error al enviar los datos al servidor:', error.message);
       // alert(error.message || "Error al enviar los datos al servidor. Por favor, intente nuevamente.");
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
const currentTime = new Date();
const isTodaySelected = selectedDate.getDate() === currentTime.getDate() &&
                        selectedDate.getMonth() === currentTime.getMonth() &&
                        selectedDate.getFullYear() === currentTime.getFullYear();

for (let i = 0; i < 24; i++) {
    let hour = (i % 12 || 12).toString();
    if (hour.length === 1) {
        hour = '0' + hour; 
    }
    hour += ':00 ' + (i < 12 ? 'AM' : 'PM');

    // Si es el día de hoy, comenzamos desde la siguiente hora
    if (isTodaySelected) {
        if (i <= currentTime.getHours()) {
            continue; // Omitir horas pasadas
        }
    }

    hoursOptions.push(hour);
}

hoursOptions.push('12:00 AM');

  
  const viewReservedClassDetails = (startTime, endTime, classId) => {   
    
    const currentTime = new Date();
    
    // Convertir las cadenas de tiempo de UTC a objetos de fecha
    const startTimeUTC = new Date(startTime);
    const endTimeUTC = new Date(endTime);
    
    // Convertir la hora actual a la zona horaria local
    const currentTimeLocal = new Date(currentTime.toLocaleString('en-US', { timeZone: 'America/Bogota' }));
    
    // Convertir las fechas UTC a la hora local
    const startTimeLocal = new Date(startTimeUTC.toLocaleString('en-US', { timeZone: 'America/Bogota' }));
    const endTimeLocal = new Date(endTimeUTC.toLocaleString('en-US', { timeZone: 'America/Bogota' }));
    startTimeLocal.setMinutes(startTimeLocal.getMinutes() - 5);

    if(callsActive === false){
          // Comprobar si la hora actual está dentro del intervalo de la clase
        
          if (currentTimeLocal >= startTimeLocal && currentTimeLocal <= endTimeLocal) {              
            const host = window.location.hostname;
            const port = window.location.port;
            let url = null;

            if(port === "5173"){
              url = `https://${host}:${port}/calls/${classId}`; 
            }else{
              url = `https://${host}/calls/${classId}`; 
            }
          
            
            // Crear la cookie con los datos de la clase que expira al finalizar la clase
            document.cookie = `classId=${classId}/${endTimeUTC.toUTCString()}; expires=${endTimeUTC.toUTCString()}; path=/`;
            window.location.href = url;
          } else {
            Swal.fire({
              icon: 'info',
              title: 'Clase no disponible en este momento......',
              text: '.',              
            }).then(() => {
              //closeModal(); // Cierra el modal después de que el usuario confirme la alerta
            });     
          
          }

    }else{
      Swal.fire({
        icon: 'info',
        title: 'Ya estas en una clase ....',
        text: 'Intenta luego.....',
      }).then(() => {
        //closeModal(); // Cierra el modal después de que el usuario confirme la alerta
      });     
    }
    
   
  };

  const dateFormat=selectedDate&&formatDateToSpanish(selectedDate)
  
  
  
  function formatTime(date) { 
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };   
    let timeString = new Date(date).toLocaleTimeString([], options);     
    timeString = timeString.replace(/\s(a|p)\.?\s*m/, (match, p1) => ` ${p1.toUpperCase()}.M`);  
    return timeString;
}
  
  const cancelClass = async (classID, startTime) => {
    console.log(classID, startTime); // Verificar que los valores sean correctos

    try {
        const response = await axios.delete(`${serverURL}/calendar/TutorCancelclass/${classID}`, {
            params: { startTime } 
        });

        Swal.fire({
            icon: 'info',
            title: 'Clase cancelada',
            text: response.data.message,
        }).then(() => {
            closeModal();
        });

    } catch (error) {
        console.error('Error al cancelar la clase:', error?.response?.data || error.message);
    }
};

  


  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}>

<div className="close-button-container" style={{ marginTop: 10 }}>
         <h3>
         Calendario
         </h3>

         <button className="closeButton" id="closeButton" onClick={closeModal}>x</button>  
      </div>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        view="month"
        locale="es-ES"
        //locale="en-US"
        showNeighboringMonth={false}
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
           

      <div className='Conten-Horas'>
        <div>
          <label>Hora de inicio:</label>
          <select className="start-time-select" value={selectedStartTime} onChange={(e) => setSelectedStartTime(e.target.value)}>
            <option value="">Seleccionar:</option>
            {hoursOptions.slice(0, -1).map((time, index) => (
              <option key={index} value={time}>{time}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Hora final:</label>
          <select className="end-time-select" value={selectedEndTime} onChange={(e) => setSelectedEndTime(e.target.value)} disabled={!selectedStartTime}>
            <option value="">Seleccionar:</option>
            {hoursOptions.slice(1).map((time, index) => {
              const startIndex = hoursOptions.findIndex(option => option === selectedStartTime);
              const disabled = index + 1 <= startIndex; 
              return <option key={index} value={time} disabled={disabled}>{time}</option>;
            })}
          </select>
        </div>

        <div style={{ marginTop: 10 }}>
          <button className="assign-class-button" onClick={assignClass} disabled={!selectedStartTime || !selectedEndTime}>Asignar clases</button>
                 
        </div>
      </div>

      <div className='Conten-Time-Class'>
      
     
  <p className='tituloCalendar2'>{dateFormat}</p>
  {availableHoursForDate.length>0&&<p className='tituloCalendar'>Horas disponibles:</p>}
  
  <div className="cuadroHoras">
    {availableHoursForDate.map(({ _id, startTime, endTime, reserved, cancel }, index) => (
      <div key={index} className={`class-info time-slot div-Class ${reserved ? 'reserved' : ''} ${cancel ? 'cancel' : ''}`}>
        
        <div className="InfoClass">
          {/* <span>{formatTime(startTime)}</span> - <span>{formatTime(endTime)}</span> */}
          <p className='formatoHoras'>{formatTime(startTime)}</p>
        </div>
        
        {reserved && (
          <div className="reserved-info">
            <button className="view-class-button" onClick={() => viewReservedClassDetails(startTime, endTime, _id)}>
           
            </button>
          </div>
        )}

           <div className='Canceldiv'>
               <p className="cancelButton"  onClick={() => cancelClass(_id,startTime)} >x</p>
           </div>
        
      </div>
    ))}
  </div>
</div>

    </Modal>
  );
}

export default CalendarClass;
