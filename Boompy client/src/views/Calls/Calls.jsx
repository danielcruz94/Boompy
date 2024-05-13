import React, { useState, useEffect } from "react";
import "./Calls.css";
import peer from "../../../src/shared/Components/Calls/WebRTCManager";
import { Headings } from "../Landing.style";
import NavBar from "../../shared/NavBar/NavBar";
import Footer from "../../shared/Components/Footer/Footer";

const Calls = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [callInProgress, setCallInProgress] = useState(false);
  const [error, setError] = useState(null);

  const [videoMute, setVideoMute] = useState(false);
  const [audioMute, setAudioMute] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isVolumeOn, setIsVolumeOn] = useState(false);

  const [videoRecibido, setVideoRecibido] = useState(true);
  const [audioRecibido, setAudioRecibido] = useState(true);
  const [nombreRecibido, setNombreRecibido] = useState("Nombre de usuario");

  const [ID, setID] = useState("079bb6e7-1421-4a4c-acd5-3239924be8e8");
  const [idOtroUsuario, setIdOtroUsuario] = useState(false);

  const toggleVolume = () => {
    if (callInProgress) {
      setIsVolumeOn(!isVolumeOn);
    }
  };

  const Config = {
    audio: audioMute,
    video: videoMute,
    name: "your name here",
  };

  const toggleVideoMute = () => {
    if (callInProgress) {
      setVideoMute((prevState) => {
        if (localStream) {
          localStream.getVideoTracks().forEach((track) => {
            track.enabled = !prevState;
          });
        }

        //Config.video = !prevState;
        //enviarInformacion(Config);

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
        //Config.audio = !prevState;
        //enviarInformacion(Config);
        return !prevState;
      });
    }
  };

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
      setVideoRecibido(data.video);
      setAudioRecibido(data.audio);
      setNombreRecibido(data.name);
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
        setIsFullScreen(false);
      }
    }
  };

  function alternarAudioVideo(audio, video) {
    return navigator.mediaDevices.getUserMedia({ audio: audio, video: video });
  }

  useEffect(() => {
    let callCounter = 0; // Inicializamos el contador de llamadas

    const handleCall = (call) => {
      setIdOtroUsuario(call.peer);

      console.log("Llamada entrante recibida");
      callCounter++; // Incrementamos el contador de llamadas
      console.log("Número total de llamadas recibidas:", callCounter);

      try {
        if (!localStream) {
          alternarAudioVideo(true, true)
            .then((stream) => {
              console.log(
                "Stream local obtenido exitosamente para responder a la llamada entrante."
              );
              setVideoMute(true);
              setAudioMute(true);
              setVideoMute(true);
              setIsVolumeOn(true);
              setLocalStream(stream);
              handleCallAnswer(call, stream);
            })
            .catch((error) => {
              console.error("Error al obtener el stream local:", error);
              setError(
                "Error al responder a la llamada entrante. Por favor, inténtalo de nuevo más tarde."
              );
            });
        } else {
          handleCallAnswer(call, localStream);
        }
      } catch (error) {
        setError(
          "Error al responder a la llamada entrante. Por favor, inténtalo de nuevo más tarde."
        );
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
    } catch (error) {
      console.error("Error al iniciar la llamada saliente:", error);
      setError(
        "Error al iniciar la llamada saliente. Por favor, inténtalo de nuevo más tarde."
      );
    }
  };

  const endCall = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }
    if (remoteStream) {
      setRemoteStream(null);
    }
    setCallInProgress(false);
    window.location.href = "https://www.google.com"; // Redirigir a google.com después de colgar la llamada
  };

  return (
    <div className="ContenCall">
      <Headings />
      <NavBar />

      <div className="full_screen">
        <div className="contenPantalla">
          <div className="Video_Entrante">
            {remoteStream && videoRecibido ? (
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
                {remoteStream && !videoRecibido && (
                  <i className="fas fa-video-slash custom-icon no-video-icon"></i>
                )}
                {remoteStream ? null : (
                  <i className="fas fa-video-slash custom-icon no-video-icon"></i>
                )}
              </React.Fragment>
            )}

            {false && (
              <div className="custom-container">
                <div className="nombre-recibido">{nombreRecibido}</div>
                <div
                  className={`custom-icon2 ${audioRecibido ? "green" : "red"}`}
                >
                  <i
                    className={`fas ico2 ${
                      audioRecibido ? "fa-microphone" : "fa-microphone-slash"
                    }`}
                  ></i>
                </div>
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

            <div className="container">
              <div className="video-call-icons">
                <div
                  className={`icon-wrapper ${isVolumeOn ? "on" : "off"}`}
                  onClick={toggleVolume}
                >
                  <i
                    className={`fas ${
                      isVolumeOn ? "fa-volume-up" : "fa-volume-mute"
                    }`}
                  ></i>
                </div>
                <div
                  className={`icon-wrapper ${!audioMute ? "off" : "on"}`}
                  onClick={toggleAudioMute}
                >
                  <i
                    className={`fas ${
                      !audioMute ? "fa-microphone-slash" : "fa-microphone"
                    }`}
                  ></i>
                </div>
                {!callInProgress ? (
                  <div className="icon-wrapper on" onClick={startOutgoingCall}>
                    <i className="fas fa-phone on"></i>
                  </div>
                ) : (
                  <div className="icon-wrapper off" onClick={endCall}>
                    <i className="fas fa-phone-slash off"></i>
                  </div>
                )}
              </div>
              <div className="video-call-icons">
                <div
                  className={`icon-wrapper ${!videoMute ? "off" : "on"}`}
                  onClick={toggleVideoMute}
                >
                  <i
                    className={`fas ${
                      !videoMute ? "fa-video-slash" : "fa-video"
                    }`}
                  ></i>
                </div>
                <div
                  className={`icon-wrapper ${isFullScreen ? "on" : "off"}`}
                  onClick={handleFullScreen}
                >
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
      {error && <div>Error: {error}</div>}
      <Footer />
    </div>
  );
};

export default Calls;
