import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import axios from 'axios';
import './Calendar.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import {formatDateToSpanish}from '../../utils/funtions'

function StudentCalendar({ isOpen, onRequestClose, onClose }) {
  const [tutorAvailability, setTutorAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [selectedClasses, setSelectedClasses] = useState([]);

  const userDataString = localStorage.getItem('userData');
  const userData = JSON.parse(userDataString);
  const studentId = userData.id;

  const serverURL = useSelector(state => state.serverURL.url);
  const callsActive = useSelector((state) => state.callsActive);

  useEffect(() => {
    Modal.setAppElement('#root');
    fetchStudentCalendarClasses(); 

    const interval = setInterval(fetchStudentCalendarClasses, 300000);

    return () => clearInterval(interval); 
  }, []);

  const fetchStudentCalendarClasses = async () => {
    try {
      const response = await axios.get(`${serverURL}/calendar/classes/${studentId}`);
      setTutorAvailability(response.data.map(item => ({
        ...item,
        startTime: new Date(item.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        endTime: new Date(item.endTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
      })));
    } catch (error) {
      //console.error('Error fetching student calendar classes:', error);
    }
  };

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
    const availability = tutorAvailability.filter(
      ({ date: availabilityDate }) =>
        new Date(availabilityDate).getTime() >= date.getTime() &&
        new Date(availabilityDate).toDateString() === date.toDateString()
    );
    setSelectedClasses(availability);
    setSelectedDate(date);
    setScrollEnabled(false);
  };

  const closeModal = () => {
    onClose();
    onRequestClose();
    setScrollEnabled(true);
  };

  const cancelClass = async (classID) => {
    const utcDate = new Date().toISOString(); // Obtén la fecha y hora UTC actual

    try {
        const response = await axios.delete(`${serverURL}/calendar/Cancelclass/${classID}`, {
            params: { utcDate: utcDate } // Envía la fecha UTC como parámetro
        });

        //console.log(response.data.message); // Muestra el mensaje devuelto por el servidor
        Swal.fire({
          icon: 'info',
          title: 'Clase cancelada....',
          text: '.',

        }).then(() => {
          closeModal(); // Cierra el modal después de que el usuario confirme la alerta
        });
    } catch (error) {
        console.error('Error al cancelar la clase:', error.response?.data || error.message);
    }
};

  const viewClass = (startTime, endTime, classId) => {
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
    classStartTime.setMinutes(classStartTime.getMinutes() - 5);

    
    if(callsActive === false){
          if (currentTime >= classStartTime && currentTime <= classEndTime) {
           // if (true) {
            const host = window.location.hostname;
            const port = window.location.port;
            let url = null;
      
            if(port === "5173"){
              url = `https://${host}:${port}/calls/${classId}`; 
            }else{
              url = `https://${host}/calls/${classId}`; 
            }
            
            // Crear la cookie con los datos de la clase que expira al finalizar la clase
            document.cookie = `classId=${classId}/${classEndTime.toUTCString()}; expires=${classEndTime.toUTCString()}; path=/`;
      
            window.location.href = url;
          } else {
            Swal.fire({
              icon: 'info',
              title: 'Clase no disponible por el momento....',
              text: '.',

            }).then(() => {
              //closeModal(); // Cierra el modal después de que el usuario confirme la alerta
            });
          }
    }else{
      Swal.fire({
        icon: 'info',
        title: 'Ya estás en una clase...',
        text: 'Intenta nuevamente más tarde...',
      }).then(() => {
        //closeModal(); // Cierra el modal después de que el usuario confirme la alerta
      });
       
    }
  
    
  };
  

  const tileClassName = ({ date }) => {
    const classes = [];

    const isToday = (localDate) => {
      const today = new Date();
      return localDate.getDate() === today.getDate() &&
             localDate.getMonth() === today.getMonth() &&
             localDate.getFullYear() === today.getFullYear();
    };

    // Función para verificar disponibilidad
    const isAvailableOnDate = (checkDate) => {
      return tutorAvailability.some(({ date: availabilityDate }) => {
        const availabilityDateTime = new Date(availabilityDate);
        return availabilityDateTime.getFullYear() === checkDate.getFullYear() &&
               availabilityDateTime.getMonth() === checkDate.getMonth() &&
               availabilityDateTime.getDate() === checkDate.getDate();
      });
    };

    // Convertir fecha UTC a local
    const convertUTCtoLocal = (utcDate) => {
      const utcDateTime = new Date(utcDate);
      const localDateTime = new Date(utcDateTime.getTime() + utcDateTime.getTimezoneOffset() * 60000);
      return localDateTime;
    };

    const localDate = convertUTCtoLocal(date);

    if (!isToday(localDate) && date < new Date()) {
      return '';
    }

    if (isAvailableOnDate(localDate)) {
      classes.push('available');
    }

    if (isToday(localDate)) {
      classes.push('today');
    }

    return classes.join(' ');
  };
  const fechaFormateada = selectedClasses.length > 0  ? formatDateToSpanish(selectedClasses[0].date) : null

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}>
      
       <div className="close-button-container" style={{ marginTop: 10 }}>
         <h3>
         Calendario
         </h3>

        <button onClick={closeModal}>X</button>
      </div>

      <Calendar 
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={tileClassName}
        view="month"
        //locale="en-US"
        locale="es-ES"
        showNeighboringMonth={false}
      />

     <div className='Conten-Time-Class'> 
      <p className='tituloCalendar'>Clases Programadas:</p>
      {fechaFormateada&&<p className='tituloCalendar2'> {fechaFormateada}</p> }
      <div className=''> 
     {selectedClasses.length > 0 && (
      
        selectedClasses.map((classInfo, index) => (
          <div key={index}  className={`class-info time-slot div-Class ${classInfo.cancel ? 'cancel' : ''}`}>
          <div className='InfoClass' >
            {/* <p>{classInfo.startTime} - {classInfo.endTime}</p> */} 
            <p className='formatoHoras'>{classInfo.startTime}</p>
            {!classInfo.cancel && (
              <button className="viewButton view-class-button" onClick={() => viewClass(classInfo.startTime, classInfo.endTime, classInfo._id)}></button>
            )}
          </div>
          {/* {!classInfo.cancel && (
            <div className='Canceldiv'>
              <button className="cancelButton" onClick={() => cancelClass(classInfo._id)}>X</button>
            </div>
          )} */}
          
        </div>
        
       


        ))
      )}
      </div>

     </div>

      
    </Modal>
  );
}

export default StudentCalendar;
