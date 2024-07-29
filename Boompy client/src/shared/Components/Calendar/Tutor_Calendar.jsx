import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import './Calendar.css';

function TutorCalendar({ pagina, ID,tutor}) {
  const [tutorAvailability, setTutorAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [showOpenButton, setShowOpenButton] = useState(true);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [EmailTutor, setEmailTutor] = useState(false);
  const [NameTutor, setNameTutor] = useState(false);


  //payment
  const [status, setStatus] = useState('CREATED');
  const [errorMessage, setErrorMessage] = useState(null);


  const serverURL = useSelector(state => state.serverURL.url);  
  const location = useLocation();
  const lastIndex = location.pathname.lastIndexOf('/');
  let id = null;

  if(ID === "Null"){   
    id = location.pathname.substring(lastIndex + 1);
  }else{
    id = ID;
  }

  useEffect(() => {

    if (modalIsOpen) {

    const fetchUser = async () => {
      try {
        const response = await fetch(`${serverURL}/user/${id}`);
        if (!response.ok) {
          throw new Error('User not found');
        }
        const userData = await response.json();
        setEmailTutor(userData.email);
        setNameTutor(userData.name);       
      } catch (error) {
        console.error('Error fetching user:', error);
       
      }
    };

    fetchUser();

  }

  }, [modalIsOpen]);

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  useEffect(() => {
    if (modalIsOpen) {
      fetchTutorAvailability();
      // Iniciar intervalo para actualización automática cada 5 minutos (300000 ms)
      const interval = setInterval(fetchTutorAvailability, 1000); // 5 minutos

      return () => clearInterval(interval); // Limpiar intervalo al desmontar el componente
    }
  }, [modalIsOpen]);

  useEffect(() => {
    if (!scrollEnabled) {
      document.body.style.overflow = 'hidden'; // Ocultar el scroll cuando se abre el modal
    } else {
      document.body.style.overflow = 'auto'; // Restaurar scroll cuando se cierra el modal
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


        const payment=await axios(`${serverURL}/createdorder`);


        const IdPayment=payment.data.id;
        console.log(IdPayment)

        const paymentUrl = payment.data.links[1].href; // Assuming the payment URL is at index 1
        window.open(paymentUrl, '_blank')

        const timeout = new Promise(resolve => setTimeout(resolve, 30000)); // 0,5 segundos

    // Espera a que se complete el pago o que expire el tiempo de espera
       await timeout;

       const idNumber={id:IdPayment}


       
       const getStatus = async (id, timeout = 50000) => { // Set a default timeout
        try {
          const response = await axios.post(`${serverURL}/statuspayment`,  id );
          const status = response.data;
          console.log("se hizo la fun")
      
          if (status === 'COMPLETED') {
            setStatus(status);
            console.log("estado final",status)
            console.log("se hizo el pago")
            return; // Exit the recursion if status is not 'CREATED'
          }
      
          // Implement a timeout mechanism to prevent infinite recursion
          const timeoutId = setTimeout(async () => {
            console.log('Payment status check timed out.');
          
          }, timeout);
      
         
          await getStatus(id, timeout); // Decrement timeout on each recursion
      
        } catch (error) {
          console.error('Error checking payment status:', error);
        }
      };


      await getStatus(idNumber,3000)

       console.log("el estado final es ",status)
        
  if(status!=="CREATED"){
    
    alert("se hizo el pago")


  }else{
    alert("no se hizo el pago")
  }

        

        const response = await axios.put(`${serverURL}/calendar/reserve/${selectedClass._id}`, { reserved: reservedValue });
        setReservationSuccess(prevState => !prevState);

        if (response.status === 200) {
          // Crear constantes temporales para almacenar los valores formateados
          const formattedDate = new Date(selectedClass.date).toLocaleString('en-US', {
            day: 'numeric',
            month: 'long', // 'long' para mostrar el nombre completo del mes en inglés
            year: 'numeric'
          });      
         
          // Datos del correo electrónico         
          const emailContentEstudiante = `
          <html>
          <body>
            <h1 style="color: #007bff;">¡Tu Clase ha sido Reservada Exitosamente!</h1>
            <p>¡Hola ${userData.name}!</p>
            <p>Tu clase ha sido reservada para el ${formattedDate}, desde las ${selectedClass.startTime} hasta las ${selectedClass.endTime}.</p>
            <p>Por favor, asegúrate de estar preparado para tu clase y estar a tiempo.</p>
            <p>¡Gracias por elegirnos para tu aprendizaje!</p>
            <p>Saludos,<br/>El equipo de Torii</p>
          </body>
          </html>
          `;
      
          const emailContentProfesor = `
          <html>
          <body>
            <h1 style="color: #007bff;">Nueva Reserva de Clase</h1>
            <p>¡Hola ${NameTutor}!</p>
            <p>Se ha realizado una nueva reserva de clase por parte de ${userData.name}.</p>
            <p>La clase está programada para el ${formattedDate}, desde las ${selectedClass.startTime} hasta las ${selectedClass.endTime}.</p>
            <p>Por favor, asegúrate de estar preparado para la clase.</p>
            <p>Saludos,<br/>El equipo de Torii</p>
          </body>
          </html>
          `;

          // Definir los datos para el correo del estudiante
          const emailDataEstudiante = {
          to: userData.email,
          subject: 'Confirmación de Reserva de Clase',
          text: emailContentEstudiante         
          };

          // Definir los datos para el correo del profesor
          const emailDataProfesor = {
          to: EmailTutor, // Debes tener definida la variable EmailTutor con el correo del profesor
          subject: 'Nueva Reserva de Clase',
          text: emailContentProfesor
          };

          // Función para enviar correos electrónicos
          const sendEmails = async () => {
          try {
            // Enviar correo al estudiante
            const responseEstudiante = await axios.post(`${serverURL}/email/enviar-email`, emailDataEstudiante);
            console.log('Correo enviado al estudiante:', responseEstudiante.data);

            // Enviar correo al profesor
            const responseProfesor = await axios.post(`${serverURL}/email/enviar-email`, emailDataProfesor);
            console.log('Correo enviado al profesor:', responseProfesor.data);

            // Puedes manejar respuestas o errores aquí si es necesario
          } catch (error) {
            console.error('Error al enviar correos electrónicos:', error);
          }
          };

          // Llamar a la función para enviar los correos electrónicos
          sendEmails();

          Swal.fire({
            icon: 'success',
            title: '¡Clase reservada con éxito!',
            text: 'Tu clase ha sido reservada exitosamente.',
          }).then(() => {
            closeModal(); // Cierra el modal después de que el usuario confirme la alerta
          });
          
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
      {pagina === 'Home' && (
        <a href="#" onClick={() => {
          setModalIsOpen(true);
          setScrollEnabled(false);
        }} style={{color:'white',textDecoration:'none' }}><span style={{fontSize:'12px',background:'#10104d',paddingLeft:'7px',paddingRight:'7px',paddingTop:'3px',paddingBottom:'3px',borderRadius:'10px',color:'white'}}> Book a ticket</span></a>
      )}
  
      {pagina === 'Tutor' && (
        <button onClick={() => {
          setModalIsOpen(true);
          setScrollEnabled(false);
        }} style={{ marginTop: '15px', background: '#10104d', color: 'white' }}>Book a Ticket</button>
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
