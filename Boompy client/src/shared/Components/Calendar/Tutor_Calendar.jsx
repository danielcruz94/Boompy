import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import {formatDateToSpanish}from '../../utils/funtions'
import ModalPagos from './Pagos/ModalPagos';

import Wompi from './Wompi';

import './Calendar.css';

function TutorCalendar({ pagina, ID,tutor,amount}) {
  const [tutorAvailability, setTutorAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  //const [showOpenButton, setShowOpenButton] = useState(true);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  //const [reservationSuccess, setReservationSuccess] = useState(false);
  const [EmailTutor, setEmailTutor] = useState(false);
  const [NameTutor, setNameTutor] = useState(false);
  const [PayIsOpen, setPayIsOpen] = useState(false);  
  const [TRM, setTrm] = useState(false);
  const [Factura, setFactur] = useState("0");
  const [hasExecuted, sethasExecuted] = useState(false);
  const [RealPrice, setRealPrice] = useState(0);
  const [RealPoint, setRealPoint] = useState(0);


  //payment
 // const [status, setStatus] = useState('CREATED');
  //const [errorMessage, setErrorMessage] = useState(null);


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

  //TRM
  useEffect(() => {    
    
    const fetchData = async () => {
        try {
            const response = await fetch('https://www.datos.gov.co/resource/32sa-8pi3.json');
            const data = await response.json();
            const valorDecimal = parseFloat(data[0].valor);           
            const valorRedondeado = Math.ceil(valorDecimal);    
            setTrm(valorRedondeado);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };
    
    fetchData();
  }, []); 

  const fetchUserData = async (serverURL, setRealPoint) => {
    try {
      const userDataString = localStorage.getItem('userData');
      const userData = JSON.parse(userDataString);
      const studentId = userData.id;
  
      const response = await axios.get(`${serverURL}/users/${studentId}/points`);
      setRealPoint(response.data.points);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData(serverURL, setRealPoint);
  }, []);


  useEffect(() => {
    const spanValor = document.querySelector('.ValorPagar');

    if (spanValor) {
        spanValor.textContent = `$${RealPrice} USD`;
    }
}, [RealPrice]);

  //Numero Factura
    function generarFactura(longitud = 6) {
   
      const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';  
      let combinacion = '';      
     
      for (let i = 0; i < longitud; i++) {
          const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
          combinacion += caracteres[indiceAleatorio];
      }
      
      return combinacion;
  }

      useEffect(() => {           
          setFactur(generarFactura(6))
    }, []); 

  const fetchTutorAvailability = async () => {
    try {      
      const response = await axios.get(`${serverURL}/calendar/${id}`);
     
      const availabilityData = response.data.filter(avail => 
        avail.reserved === "" && avail.cancel !== true
      );

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
    fetchUserData(serverURL, setRealPoint);
    setSelectedDate(date);
    setModalIsOpen(true);
    setScrollEnabled(false);   
  };

  const closeModal = () => {
    fetchUserData(serverURL, setRealPoint);
    setModalIsOpen(false);   
    setScrollEnabled(true);
  };

  //---------------ORGANIZAR PAGOS-------------------------------------------------------------------------

  const PayChange = () => {
    setModalIsOpen(false); 
    setPayIsOpen(true)
    setScrollEnabled(true);
    setTimeout(consultapago, 7000);
   
  };

  const closepay = () => {    
    setPayIsOpen(false)
    setScrollEnabled(true);

    sethasExecuted(false);
    setRealPrice(amount); 

    const spanPoints = document.querySelector('.points');
    spanPoints.textContent = `Points: ${RealPoint}`
    
  };
 
  function formatearConPuntos(numero) {    
    let numString = numero.toString();    
    let formateado = numString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    
    return formateado;
}

       
  const PayPal= () => {
    assignClass(null)
  }

  const updateUserPointsRequest = async (userId, points) => {
    try {
      const response = await axios.patch(`${serverURL}/users/${userId}/updatePoints`, { points });
      console.log(response)
      // Verifica la respuesta
      return response.data.updated || false;
    } catch (error) {
      console.error('Error al actualizar los puntos:', error);
      return false;
    }
  };
  

  const PayPoint = async () => {
    let points

    if (hasExecuted) {
      //console.log("La función ya se ha ejecutado una vez.");
      return; // Sale si ya se ejecutó
    }
  
    
  
    try {
      const userDataString = localStorage.getItem('userData');
      const userData = JSON.parse(userDataString);
      const studentId = userData.id;
  
      const response = await axios.get(`${serverURL}/users/${studentId}/points`);
      points = response.data.points

      if(points != 0){
  
        setRealPoint(points)
        sethasExecuted(true);

          if (points / 100 >= amount) {
                  points = points - (amount * 100);
                  const result = await updateUserPointsRequest(studentId, points);

                  if(result){ assignClass("APPROVED"); }                 
                  
              } else {
                  console.log("Se descuentan puntos");
                  let total = amount - (points / 100)
                  setRealPrice(total); 
                  points = 0;
                  console.log(RealPrice);
                  console.log(points);
                  
          }

          

            const spanPoints = document.querySelector('.points');
            spanPoints.textContent = `Points: ${points}`
            
    }else{
      alert("no tienes suficientes puntos.")
    }



    } catch (error) {
      console.error("Error fetching points:", error);
    }
  };
  


  //consulta pago 
  async function consultapago() {
    const url = `${serverURL}/wompi/${Factura}`;
    const retryInterval = 1000; 
    const maxRetries = 1000; 

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await axios.get(url);
            const data = response.data;

            if (data) {              
                if(data[0].status === "APPROVED"){
                  console.log('Datos recibidos:', data[0].status);
                    assignClass(data[0].status)
                  
                }
                
                return; 
            }
        } catch (error) {
           // console.log('Error al obtener los datos:', error.message);
        }        
        await new Promise(resolve => setTimeout(resolve, retryInterval));
    }

    console.log('Número máximo de intentos alcanzado. Deteniéndose.');
  }

  //asistencia
  //email comentado descomentar al finalizar
  const enviarAsistencia = async (eventId, userIds, selectedClass, userData) => {  
    try {
      if (!eventId || !Array.isArray(userIds) || userIds.length === 0) {
        throw new Error('Faltan datos requeridos: eventId o userIds.');
      }

      const response = await fetch(`${serverURL}/attendances`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ eventId, userIds })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(`Error ${response.status}: ${errorData.message}`);
        throw new Error(`Error ${response.status}: ${errorData.message}`);
      }

      if (response.status === 201) {
        setPayIsOpen(false)        
        setModalIsOpen(true);

        const formattedDate = new Date(selectedClass.date).toLocaleString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });

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

        const emailDataEstudiante = {
          to: userData.email,
          subject: 'Confirmación de Reserva de Clase',
          text: emailContentEstudiante
        };

        const emailDataProfesor = {
          to: EmailTutor,
          subject: 'Nueva Reserva de Clase',
          text: emailContentProfesor
        };

        const sendEmails = async () => {
          try {
            
              //Enviar correo al estudiante
             const responseEstudiante = await axios.post(`${serverURL}/email/enviar-email`, emailDataEstudiante);
             

              //Enviar correo al profesor
            const responseProfesor = await axios.post(`${serverURL}/email/enviar-email`, emailDataProfesor);
           

           sethasExecuted(false);
           setRealPrice(amount); 
            
          } catch (error) {
            console.error('Error al enviar correos electrónicos:', error);
          }
        };

        await sendEmails();
        setFactur(generarFactura(6))

        Swal.fire({
          icon: 'success',
          title: '¡Buenas noticias! ¡Tu clase está reservada!',
          text: 'Tu clase ha sido reservada exitosamente',
        }).then(() => {
          closeModal(); 
        });

      } else {
        throw new Error("Error al enviar los datos al servidor. Por favor, intente nuevamente.");
      }

      const responseData = await response.json();
      //console.log('Asistencias creadas exitosamente:', responseData);
      return responseData;

    } catch (error) {
      console.error('Error al enviar la asistencia:', error);
      throw error;
    }
  };

  //verifica pago 
  const getStatus = async (id, timeout = 50000) => {
    const startTime = Date.now();
    try {
      const response = await axios.post(`${serverURL}/statuspayment`, id);
      const answer = response.data;

      if (answer === 'COMPLETED') return 'COMPLETED';
      if (Date.now() - startTime > timeout) return 'TIMEOUT';

      await new Promise(resolve => setTimeout(resolve, 1000));
      return await getStatus(id, timeout);
    } catch (error) {
      console.error('Error al verificar el estado del pago:', error);
      return 'ERROR';
    }
  };

  async function handlePaymentStatus(  isPaid, selectedClass, reservedValue, newClassData, userData){
    switch (isPaid) {
        case 'COMPLETED': {
            try {
                const response = await axios.put(`${serverURL}/calendar/reserve/${selectedClass._id}`, {
                    reserved: reservedValue,
                    price: RealPrice
                });
                
                if (!response || !response.data) {
                    throw new Error('No se recibió respuesta del servidor al reservar la clase.');
                }
              

                await enviarAsistencia(newClassData.classId, [newClassData.userId, newClassData.reserved], selectedClass, userData);

            } catch (error) {
                console.error('Error al completar el pago o reservar la clase:', error);
            }
            break;
        }
        case 'TIMEOUT':
            console.log('Se ha alcanzado el tiempo máximo de espera.');
            break;
        case 'ERROR':
            console.error('Ha ocurrido un error al verificar el pago.');
            break;
        default:
            console.error('Resultado inesperado:', isPaid);
    }
  }

  const assignClass = async (status) => {
  
    // Recupera los datos del usuario almacenados en localStorage
    const userDataString = localStorage.getItem('userData');
    const userData = JSON.parse(userDataString);
    const reservedValue = userData.id;

    let isPaid = status

    // Busca la clase disponible que coincide con la fecha y hora seleccionadas
    const selectedClass = tutorAvailability.find(availability => {
        const availabilityDate = new Date(availability.date).toLocaleDateString();
        const availabilityTime = `${availability.startTime} - ${availability.endTime}`;
        
        return availabilityDate === selectedDate.toLocaleDateString() && availabilityTime === selectedTime;
    });



    setModalIsOpen(false)
   
    if (selectedClass) {
        // Prepara los datos para la nueva clase
        const newClassData = {
            date: selectedClass.date,
            startTime: selectedClass.startTime,
            endTime: selectedClass.endTime,
            userId: selectedClass.userId,
            classId: selectedClass._id,
            reserved: reservedValue,
            price: RealPrice
        };        

        try {         
        
          
      
          if(isPaid != "APPROVED"){
                const payment = await axios.post(`${serverURL}/createdorder`, { amount: RealPrice });
                  
                const IdPayment = payment.data.id;
                const paymentUrl = payment.data.links[1]?.href;               
                if (paymentUrl) {window.open(paymentUrl, '_blank')} 
              
                const idNumber = { id: IdPayment };
                isPaid = await getStatus(idNumber, 30000);       
          }else{
               isPaid = "COMPLETED";
          }
                   
                
                

                handlePaymentStatus(isPaid, selectedClass, reservedValue, newClassData, userData);
      
           


        } catch (error) {
            console.error("Error reservando la clase:", error);
        }
    } else {
        console.error("No se encontró una clase para la fecha y hora seleccionadas.");
    }

    // Habilita el desplazamiento y limpia el tiempo seleccionado
    //setScrollEnabled(true);
    //setSelectedTime('');
  }; 


  const getAvailableTimesForDate = (date) => {
    const availabilityForDate = tutorAvailability.filter(availability => new Date(availability.date).toLocaleDateString() === date.toLocaleDateString());
    if (availabilityForDate.length > 0) {
      return availabilityForDate.map(availability => `${availability.startTime} - ${availability.endTime}`);
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

  const fechaFormateada = selectedDate &&  formatDateToSpanish(selectedDate) 

  return (
    <>
      {pagina === 'Home' && (
  <a href="#" onClick={() => {
    fetchUserData(serverURL, setRealPoint);
    setModalIsOpen(true);
    setScrollEnabled(false);
    setRealPrice(amount); 
  }}>
    <span>Reservar</span>
  </a>
)}

      {pagina === 'Tutor' && (
        <button onClick={() => {
          setModalIsOpen(true);
          setScrollEnabled(false);
          setRealPrice(amount); 
        }} className='Reservar'>Activa tu práctica real</button>
      )}

<Modal 
  isOpen={PayIsOpen}
  onRequestClose={closepay}
  className="payment-modal-content"
  overlayClassName="payment-modal-overlay"
>
  <ModalPagos closepay={closepay} RealPrice={RealPrice} puntos={formatearConPuntos(RealPoint)} PayPoint={PayPoint} PayPal={PayPal} TRM={TRM} Factura={Factura}></ModalPagos>
 
</Modal>


      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}>

      <div className="close-button-container" style={{ marginTop: 10 }}>
         <h3>
         Calendario
         </h3>

         <button onClick={closeModal} className="close-btn">X</button>
         </div>

         <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          view="month"
          locale="es-ES"
          //locale="en-US"
          showNeighboringMonth={false}
          tileClassName={({ date }) => {
            const dateString = date.toLocaleDateString();
            const classes = [];

            // Verifica si la fecha es hoy
            const isToday = dateString === new Date().toLocaleDateString();

            if (isToday) {
              classes.push('today'); 
            }

            if (customClasses[dateString]) {
              classes.push(customClasses[dateString]);
            }
            if (isClassPassed(dateString)) {
              classes.push('past-class');
            }
            
            return classes.join(' ');
          }}
        />


<div className='Conten_Select_Clase'>
  
  {/* El select original está oculto pero sigue funcionando */}
  <select
    className='Tutor_Select_Clase'
    value={selectedTime}
    onChange={(e) => setSelectedTime(e.target.value)}
    style={{ display: 'none' }} // El select original está oculto
  >
    
    <option value="">Hora y disponibilidad:</option>
    {getAvailableTimesForDate(selectedDate).map((time, index) => (
      <option key={index} value={time}>{time}</option>
    ))}
  </select>

 
  
  {/* Opciones personalizadas para que el usuario las seleccione */}

  <p className='tituloCalendar2 calendarDate'>{fechaFormateada}</p>
 
  <p className='titlehoras'> Selecciona una hora:</p>
  <div className="custom-options-container">
  {getAvailableTimesForDate(selectedDate).map((time, index) => (

    <div
      key={index}
      className={`custom-option ${selectedTime === time ? 'selected' : ''}`}
      onClick={() => {
        setSelectedTime(time); 
        console.log(selectedTime)// Actualiza el valor del select original
      }}       
    >
      {time.replace('AM', 'A.M.').replace('PM', 'P.M.').replace('PM', 'P.M.')}
    </div>
  ))}
</div>



  {/* Botón para asignar la clase, se habilita solo si hay una selección */}
  <div className='botton_Select_Clase'>
    <button onClick={PayChange} disabled={!selectedTime} className="assign-class-btn">
    Asignar clase
    </button>
  </div>
</div>



        
      </Modal>
    </>
  );
}

export default TutorCalendar;
