import { useState, useEffect } from 'react';
import { setActive } from '../../Redux/Calls';
import { useSelector,useDispatch } from "react-redux"
import { TimeUTC } from './TimeUTC';


const Timer = ({ variable, endCall }) => { 
  const [Cookie, setCookie] = useState('');  
  const [HoraFinal, setHoraFinal] = useState('');  
  

  const callsActive = useSelector((state) => state.callsActive);
  const dispatch = useDispatch();
 
 

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

  //UTC SERVIDOR
  useEffect(() => {
    const HoraUTC = async () => {
        try {
            const horaUTC = await TimeUTC();      

            const utcDate = new Date(horaUTC);
            const localDate = new Date(utcDate);

            let HoraLocal = parseInt(formatTwoDigits(localDate.getHours()));
            let minutosLocal = parseInt(formatTwoDigits(localDate.getMinutes()));
            let segundosLocal = parseInt(formatTwoDigits(localDate.getSeconds()));

            const horaFinalTexto = HoraFinal.toString();
            const partesHora = horaFinalTexto.split(":");
      
            const FinClase = parseInt(partesHora[0]);   
            const MinFinal = parseInt(partesHora[1]); 
            const SegFinal = parseInt(partesHora[2]); 

            const interval = setInterval(() => {

              segundosLocal += 1; 

              if(segundosLocal === 60){
                minutosLocal  += 1; 
                segundosLocal = 0;
              }

              if(minutosLocal === 60){
                HoraLocal  += 1; 
                minutosLocal = 0;
              }

              if(HoraLocal === 24){             
                HoraLocal = 0;
              }
            
             // let horasF = HoraLocal.toString().padStart(2, '0');
              let minutosF = minutosLocal.toString().padStart(2, '0');
              let segundosF = segundosLocal.toString().padStart(2, '0'); 

                    if (minutosLocal >= 55 && minutosLocal <= 59) {          
                      if (!document.getElementById('tiempo').classList.contains('red')) {          
                        document.getElementById('tiempo').classList.add('red');
                      }
                    } else {        
                          document.getElementById('tiempo').classList.remove('red');
                    }          
                                  
                    
                    // Aquí defines la lógica para verificar la condición y actuar en consecuencia
                    if (HoraLocal === FinClase && minutosLocal === MinFinal && segundosLocal === SegFinal) {  
                        endCall();
                        clearInterval(interval);
                    }
                    
          
                  document.getElementById('tiempo').innerHTML = `${minutosF} : ${segundosF}`;

        }, 1000); 
          

        } catch (error) {
            console.error('Error al obtener la hora UTC:', error);
        }
    };

    HoraUTC();
  }, [HoraFinal]);


  return (
    <div>
      {callsActive && <p id="tiempo" className='call-timer'></p>}
    </div>
  );
  
};

export default Timer;
