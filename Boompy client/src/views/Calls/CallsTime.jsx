import React, { useState, useEffect } from 'react';
import { useSelector,useDispatch } from "react-redux"

const Timer = ({ variable, endCall }) => {
  const [isActive, setIsActive] = useState(false);
  const [Cookie, setCookie] = useState('');  
  const [HoraFinal, setHoraFinal] = useState('');
  const [MinFinal, setMinFinal] = useState('');

  const callsActive = useSelector((state) => state.callsActive);

  // Obtener el valor de la cookie 'classId' al montar el componente
  useEffect(() => {
    const todasLasCookies = document.cookie;
    const cookiesSeparadas = todasLasCookies.split('; ');

    cookiesSeparadas.forEach(cookie => {
      let [nombre, valor] = cookie.split('=');
      if (nombre.trim() === 'classId') {
        setCookie(valor);
      }
    });
  }, []); 
  
  useEffect(() => {
    if (Cookie) {
      const partes = Cookie.split('/');
      const utcValue = partes[partes.length - 1];       
      const fechaUTC = new Date(utcValue);
      const horaLocalFormateada = fechaUTC.toLocaleTimeString();       
       setHoraFinal(horaLocalFormateada);       
    }
  }, [Cookie]);

  // Función para formatear minutos y segundos a dos dígitos
  const formatTwoDigits = (num) => {
    return num.toString().padStart(2, '0');
  };

  // Comparar HoraLocal y HoraFinal cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      
      const HoraLocal = formatTwoDigits(new Date().getHours());
      const minutosLocal = formatTwoDigits(new Date().getMinutes());
      const segundosLocal = formatTwoDigits(new Date().getSeconds());

      const horaFinalTexto = HoraFinal.toString();
      const partesHora = horaFinalTexto.split(":");

      const FinClase = parseInt(partesHora[0]);   
      const MinFinal = parseInt(partesHora[1]); 
      const SegFinal = parseInt(partesHora[2]); 
      
          if (minutosLocal >= 55 && minutosLocal <= 59) {          
                if (!document.getElementById('tiempo').classList.contains('red')) {          
                  document.getElementById('tiempo').classList.add('red');
                }
          } else {        
                document.getElementById('tiempo').classList.remove('red');
          }
      
      if (HoraLocal ===FinClase && minutosLocal === MinFinal && segundosLocal === SegFinal) {
        console.log("¡Las horas locales coinciden con la hora final!");
        endCall();
        clearInterval(interval); 
      }
     
      document.getElementById('tiempo').innerHTML = `${minutosLocal} : ${segundosLocal}`;

    }, 1000); 
    return () => clearInterval(interval);
  }, [HoraFinal]);

  return (
    <div>
      {callsActive && <p id="tiempo" className='call-timer'></p>}
    </div>
  );
};

export default Timer;
