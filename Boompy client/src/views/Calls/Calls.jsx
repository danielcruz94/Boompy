import React, { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux"
import "./Calls.css";
import { setUserId, initializePeer } from "../../../src/shared/Components/Calls/WebRTCManager";
import { Headings } from "../Landing.style";
import NavBar from "../../shared/NavBar/NavBar";
import Footer from "../../shared/Components/Footer/Footer";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import CallTimer from './CallsTime';
import DeleteOnline from './DeleteOnline';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { setActive, toggleActive } from '../../Redux/Calls';
import { TimeUTC } from './TimeUTC';



const userDataString = localStorage.getItem('userData');
const userData = JSON.parse(userDataString);

let userId = null;
if (userData !== null && typeof userData === 'object' && 'id' in userData) {
    userId = userData.id;
} else {
   // console.error("No se encontró 'id' en los datos del usuario");
}

setUserId(userId);
const peer = initializePeer();

if (peer) {
    // Ahora puedes usar `peer` para la comunicación PeerJS
    //console.log(userId)
   
} else {
   // console.error('No se pudo inicializar PeerJS debido a un error.');
}


const Calls = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [callInProgress, setCallInProgress] = useState(false);
  const [error, setError] = useState(null);

  const [videoMute, setVideoMute] = useState(false);
  const [audioMute, setAudioMute] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isVolumeOn, setIsVolumeOn] = useState(false);

  const [callDuration, setCallDuration] = useState(0);
  const [ID, setID] = useState();
  const [Cargando, setCargando] = useState(false);
  const [HoraInicio, setHoraInicio] = useState(false);
  const [isiPhone, setIsiPhone] = useState(false);
 

  const serverURL = useSelector(state => state.serverURL.url);
  const dispatch = useDispatch();
  const callsActive = useSelector((state) => state.callsActive);


    const location = useLocation();
    const lastIndex = location.pathname.lastIndexOf('/');
    const idClase = location.pathname.substring(lastIndex + 1);  


    const updateAttendanceByUserId = async (eventId, userId) => {
      if (!eventId || !userId) {
        throw new Error('eventId y userId son necesarios.');
      }
    
      try {
        const response = await axios.put(`${serverURL}/attendances/${eventId}/${userId}`);
        console.log('Asistencias actualizadas:');      
      } catch (error) {
        console.error('Error al actualizar asistencias:', error);
        throw error;
      }
    };
    



        updateAttendanceByUserId(idClase, userId)
          



      useEffect(() => {
        const userAgent = navigator.userAgent;
        const isiPhoneDevice = /iPhone/.test(userAgent);
        setIsiPhone(isiPhoneDevice);
      }, []);

      //agregar online consultar online
      useEffect(() => {
           
          async function enviarId(id) {
            try {

                const url = `${serverURL}/addId/${id}`;                

                const response = await axios.post(url); 
               // console.log(response.data.message)          
            } catch (error) {
                console.error('Error al enviar el id:', error);
            }
          }
          enviarId(userId);
          
          async function isUserOnline(userId) {
            try {
                const url = `${serverURL}/GetUserOnline/${ID}`;
                const response = await axios.get(url);             
              
             
                
                if (!response.data.exists) {
                    // Usuario no está online
                    if (userData.role === 'Tutor') {
                        
                         Swal.fire({
                          icon: 'info',
                          title: '¡Waiting for Student!',
                          text: 'wait here, it will connect in a few moments',
                      }).then(() => {
                       
                      });
                        
                    }
                    if (userData.role === 'Student') {                       
                         Swal.fire({
                          icon: 'info',
                          title: '¡Waiting for Tutor!',
                          text: 'wait here, it will connect in a few moments',
                      }).then(() => {
                        
                      });
                    }
                }


                const HoraUTC = async () => {
                  try {
                      // Llamar a la función asincrónica para obtener la hora UTC
                      const horaUTC = await TimeUTC(); 
                      let FechaUTC = new Date(horaUTC);     
                      
                      let FechaInicio = new Date(HoraInicio);                   

                      let intervalId;
                      if (response.data.exists === true) {
                        
                              intervalId = setInterval(() => {  
                                FechaUTC.setSeconds(FechaUTC.getSeconds() + 1);
                                                   
                                    if (FechaUTC.getTime() >= FechaInicio.getTime()){                                    
                                        startOutgoingCall();
                                        clearInterval(intervalId);
                                    }  
    
                              }, 1000);
                        
                      }                      
                 
                  } catch (error) {                  
                      console.error('Error al obtener la hora UTC:', error);
                  }
              }
              
              HoraUTC();

                
            } catch (error) {
                console.error(`Error al obtener estado de usuario ${userId}:`, error);
                return { error: error.message }; // Devolver un objeto con el mensaje de error
            }
        }
        
          if(ID != undefined){        
            isUserOnline(ID);
          }      

      }, [ID]); 
   

      useEffect(() => {        
        const getCalendarClasses = async () => {
            try {
                const response = await axios.get(`${serverURL}/calendar/class/${idClase}`); 
                               
                const userDataString = localStorage.getItem('userData');
                const userData = JSON.parse(userDataString);
                
                setHoraInicio(response.data.startTime);
                                
                if (userData.role === 'Tutor') {                  
                  setID(response.data.reserved);
                } else if (userData.role === 'Student') {
                  setID(response.data.userId);                 
                }
                setCargando(true)
                
            } catch (error) {
                console.error('Error al obtener las clases de calendario:', error);
            }
          };
        getCalendarClasses();
      }, [idClase]); 



    // En endCall
      const endCall = () => {
          
        setCallInProgress(false);

        console.log(callInProgress)

        if (localStream) {
          localStream.getTracks().forEach((track) => track.stop());
          setLocalStream(null);
        }
        if (remoteStream) {
          setRemoteStream(null);
        }
        
            const host = window.location.hostname;
            const port = window.location.port;
            let url = null;

            if(port === "5173"){
              url = `https://${host}:${port}/home`; 
            }else{
              url = `https://${host}/home`; 
            }
        
     
        setTimeout(() => {
          window.location.href = url;
        }, 200);
      };

  const toggleVolume = () => {
    if (callInProgress) {
      setIsVolumeOn(!isVolumeOn);
    }
  };

  const toggleVideoMute = () => {
    if (callInProgress) {
      setVideoMute((prevState) => {
        if (localStream) {
          localStream.getVideoTracks().forEach((track) => {
            track.enabled = !prevState;
          });
        }
   
        return !prevState;
      });
    }
  };

  const toggleAudioMute = () => {
    if (callInProgress) {
      setAudioMute((prevState) => {
        if (localStream) {
          localStream.getAudioTracks().forEach((track) => {
            track.enabled = !prevState;
          });
        }
        
        return !prevState;
      });
    }
  };

  //mensaje de texto 
  const enviarInformacion = (mensaje) => {
    if (callInProgress) {
      const connection = peer.connect(ID); // Conéctate con el otro par
      connection.on("open", () => {
        connection.send(mensaje); // Envía el mensaje cuando la conexión está abierta
      });
    }
  };

  const recibirInformacion = (data) => {
    if (typeof data === "object" && data !== null && !Array.isArray(data)) {
   console.log("colocar ping en linea")
    } else {
      console.log("No se recibió un objeto:", data);
      // Aquí puedes realizar las acciones que necesites si no se recibe un objeto
    }
  };

  let conexionEstablecida = false;

  peer.on("connection", (connection) => {
    if (!conexionEstablecida) {
      connection.on("data", recibirInformacion);
      conexionEstablecida = true;
    } else {
      // Rechazar la conexión
      connection.close();
    }
  });

  const handleFullScreen = () => {
    const element = document.querySelector(".full_screen");
    const videoEntrante = document.querySelector('.Video_Entrante');

    if (callInProgress) {
      if (!isFullScreen) {
        if (element) {
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
          } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
          }
          videoEntrante.classList.add('height-percent');
          setIsFullScreen(true);
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
        videoEntrante.classList.remove('height-percent');
        setIsFullScreen(false);
      }
    }
  };

  document.addEventListener('fullscreenchange', exitHandler);
  document.addEventListener('webkitfullscreenchange', exitHandler);
  document.addEventListener('mozfullscreenchange', exitHandler);
  document.addEventListener('MSFullscreenChange', exitHandler);

    function exitHandler() {
      const videoEntrante = document.querySelector('.Video_Entrante');
      
      if (videoEntrante.classList.contains('height-percent')) {
          if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreenElement && !document.msFullscreenElement) {
          
              videoEntrante.classList.remove('height-percent');
              setIsFullScreen(false);
          }
      }
  }


  function alternarAudioVideo(audio, video) {
    return navigator.mediaDevices.getUserMedia({ audio: audio, video: video });
  }

  useEffect(() => {
    let callCounter = 0; // Inicializamos el contador de llamadas

    const handleCall = (call) => {
        console.log("Llamada entrante recibida");
        callCounter++; // Incrementamos el contador de llamadas
        console.log("Número total de llamadas recibidas:", callCounter);

        // Mostrar un mensaje al usuario para aceptar o rechazar la llamada
       // const aceptarLlamada = window.confirm("¿Deseas aceptar la llamada entrante?");
        if (true) {
            try {
                if (!localStream) {
                    alternarAudioVideo(true, true)
                        .then((stream) => {
                            console.log("Stream local obtenido exitosamente para responder a la llamada entrante.");
                            setVideoMute(true);
                            setAudioMute(true);
                            setVideoMute(true);
                            setIsVolumeOn(true);
                            setLocalStream(stream);
                            handleCallAnswer(call, stream);       
                            
                            

                        })
                        .catch((error) => {
                            console.error("Error al obtener el stream local:", error);
                            alert("Error al responder a la llamada entrante. Por favor, inténtalo de nuevo más tarde.");
                        });
                } else {
                    handleCallAnswer(call, localStream);
                }
            } catch (error) {
                alert("Error al responder a la llamada entrante. Por favor, inténtalo de nuevo más tarde.");
            }
        } else {
            // El usuario rechazó la llamada
            console.log("Llamada entrante rechazada");
            // Puedes realizar acciones adicionales aquí si es necesario
        }
    };

    peer.on("call", handleCall);

    // Limpiamos el efecto
    return () => {
        peer.off("call", handleCall);
    };
}, [localStream]);


  const handleCallAnswer = (call, stream) => {
    call.answer(stream);
    call.on("stream", (remoteStream) => {
      setRemoteStream(remoteStream);
    });
    setCallInProgress(true);
    dispatch(setActive(true));
  };

  const startOutgoingCall = async () => {
  try {
    console.log("Iniciando llamada saliente...");
    const stream = await alternarAudioVideo(true, true);
    console.log(
      "Stream local obtenido exitosamente para la llamada saliente."
    );
    setLocalStream(stream);
    const idDelOtroUsuario = ID; // ID del otro usuario
    const call = peer.call(idDelOtroUsuario, stream);
    console.log("Llamada saliente creada:", call);
    call.on("stream", (remoteStream) => {
      console.log(
        "Stream remoto recibido en la llamada saliente:",
        remoteStream
      );
      setVideoMute(true);
      setAudioMute(true);
      setVideoMute(true);
      setIsVolumeOn(true);
      setRemoteStream(remoteStream);

      
    });
    setCallInProgress(true);    
    dispatch(setActive(true));

  } catch (error) {
    console.error("Error al iniciar la llamada saliente:", error);
    setError(
       "Ya existe una conexión activa en otro dispositivo. Por favor, cierra la aplicación en ese dispositivo antes de continuar."    );
  }
  };
  

  const notificacionLlamada = () => {
    if (callInProgress) {
      setCallDuration((prevDuration) => {
        if (prevDuration >= 10) {
          document.querySelector(".call-timer").classList.add("red");
        }
  
        if (prevDuration >= 600) {
          finalizarLlamada();
        }
  
        return prevDuration + 1;
      });
    }
  };
  

  const finalizarLlamada = () => {
    console.log("Función finalizar Llamada");
    endCall();
  };

  useEffect(() => {
    const timer = setInterval(notificacionLlamada, 1000);

    return () => clearInterval(timer);
  }, []);



  

  return (
    <div className="ContenCall">
      {/* Condicional para renderizar el contenido o el mensaje de carga */}
      {Cargando ? (
        <>
          <Headings />
          <NavBar />          
          
            <div className="contenPantalla">
            <div className="full_screen">
              {/* Contenido de la llamada */}
              <div className="Video_Entrante">
                {remoteStream ? (
                  <video
                    className="VideoCall"                    
                    autoPlay                   
                    ref={(video) => {
                      if (video && remoteStream) {
                        video.srcObject = remoteStream;
                        video.muted = !isVolumeOn; // Mute the video based on isVolumeOn
                      }
                    }}
                  />
                ) : (
                  <React.Fragment>
                    {remoteStream &&  (
                      <i className="fas fa-video-slash custom-icon no-video-icon"></i>
                    )}
                    {remoteStream ? null : (
                      <i className="fas fa-video-slash custom-icon no-video-icon"></i>
                    )}
                  </React.Fragment>
                )}
  
                {false && (
                  <div className="custom-container">
                    
                    
                  </div>
                )}
              </div>
  
              <div className="InfoCall">
                <div className="Video_saliente">
                  {videoMute ? (
                    localStream && (
                      <video
                        className="VideoCall"
                        autoPlay                      
                        muted={true}
                        ref={(video) => {
                          if (video) video.srcObject = localStream;
                        }}
                      />
                    )
                  ) : (
                    <i className="fas fa-video-slash custom-icon no-video-icon"></i>
                  )}
                </div>
                {callInProgress && <CallTimer variable={callInProgress} endCall={endCall} />}
                <div className="Control-container">
                <div className="video-call-icons">
                  <div className={`icon-wrapper ${isVolumeOn ? "on" : "off"}`} onClick={toggleVolume}>
                    <i className={`fas ${isVolumeOn ? "fa-volume-up" : "fa-volume-mute"}`}></i>
                  </div>
                  <div className={`icon-wrapper ${!audioMute ? "off" : "on"}`} onClick={toggleAudioMute}>
                    <i className={`fas ${!audioMute ? "fa-microphone-slash" : "fa-microphone"}`}></i>
                  </div>
                  {!callInProgress && userData.role !== 'Tutor' && userData.role !== 'Student' && (
                    <div className="icon-wrapper on" onClick={startOutgoingCall}>
                      <i className="fas fa-phone on"></i>
                    </div>
                  )}
                  {callInProgress && (
                    <div className="icon-wrapper off" onClick={endCall}>
                      <i className="fas fa-phone-slash off"></i>
                    </div>
                  )}
                  <div className={`icon-wrapper ${!videoMute ? "off" : "on"}`} onClick={toggleVideoMute}>
                    <i className={`fas ${!videoMute ? "fa-video-slash" : "fa-video"}`}></i>
                  </div>
                  <div className={`icon-wrapper ${isFullScreen ? "on" : "off"}`} onClick={handleFullScreen}>
                    {isFullScreen ? (
                      <i className="fas fa-compress"></i>
                    ) : (
                      <i className="fas fa-expand"></i>
                    )}
                  </div>
                </div>
              </div>

              </div>
            </div>
          </div>
          {error && <div className="Error">{error}</div>}
          <Footer />
          <DeleteOnline  userId={userId} callInProgress={callInProgress} peer={peer} />
        </>
      ) : (
        // Mensaje de carga
        <div>Cargando...</div>
      )}
    </div>
  );
  
};

export default Calls;
