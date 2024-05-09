import React, { useState, useEffect } from 'react';
import './Calls.css';
import peer from '../../../src/shared/Components/Calls/WebRTCManager';
import { Headings } from '../Landing.style';
import NavBar from '../../shared/NavBar/NavBar';
import Footer from '../../shared/Components/Footer/Footer';

const Calls = () => {
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [callInProgress, setCallInProgress] = useState(false);
    const [error, setError] = useState(null);
    
    const [videoMute, setvideoMute] = useState(false);
    const [audioMute, setaudioMute] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isVolumeOn, setIsVolumeOn] = useState(false);

    const toggleVolume = () => {
    setIsVolumeOn(!isVolumeOn);
};

const toggleVideoMute = () => {
    setvideoMute(prevState => {
        if (localStream) {
            localStream.getVideoTracks().forEach(track => {
                track.enabled = !prevState;
            });
        }
        return !prevState; // Este return debe estar fuera del bloque if
    });
};

    
    const toggleAudioMute = () => {
        setaudioMute(prevState => {
            if (localStream) {
                localStream.getAudioTracks().forEach(track => {
                    track.enabled = !prevState;
                });
            }
            return !prevState;
        });
    };
    
    const handleFullScreen = () => {
        const element = document.querySelector('.full_screen');
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
    };
      

    function alternarAudioVideo(audio, video) {
        return navigator.mediaDevices.getUserMedia({ audio: audio, video: video })
           
    }
    

    useEffect(() => {
        let callCounter = 0; // Inicializamos el contador de llamadas
    
        const handleCall = (call) => {
            console.log('Llamada entrante recibida');
            callCounter++; // Incrementamos el contador de llamadas
            console.log('Número total de llamadas recibidas:', callCounter);
            
            try {
                if (!localStream) {
                    alternarAudioVideo(true ,true)
                        .then((stream) => {
                            console.log('Stream local obtenido exitosamente para responder a la llamada entrante.');
                            setvideoMute(true);
                            setaudioMute(true);
                            setvideoMute(true);
                            setIsVolumeOn(true)
                            setLocalStream(stream);
                            handleCallAnswer(call, stream);
                        })
                        .catch((error) => {
                            console.error('Error al obtener el stream local:', error);
                            setError('Error al responder a la llamada entrante. Por favor, inténtalo de nuevo más tarde.');
                        });
                } else {
                    handleCallAnswer(call, localStream);
                }
            } catch (error) {
                setError('Error al responder a la llamada entrante. Por favor, inténtalo de nuevo más tarde.');
            }
        };
    
        peer.on('call', handleCall);
    
        // Limpiamos el efecto
        return () => {
            peer.off('call', handleCall);
        };
    }, [localStream]);
    

    const handleCallAnswer = (call, stream) => {
        call.answer(stream);
        call.on('stream', (remoteStream) => {
            setRemoteStream(remoteStream);
        });
        setCallInProgress(true);
    };

    const startOutgoingCall = async () => {
        try {
            console.log('Iniciando llamada saliente...');
            const stream = await alternarAudioVideo(true ,true)
            console.log('Stream local obtenido exitosamente para la llamada saliente.');
            setLocalStream(stream);
            const idDelOtroUsuario = 'f224cb6c-8f5a-42f6-b05b-239fde97f074'; // ID del otro usuario
            const call = peer.call(idDelOtroUsuario, stream);
            console.log('Llamada saliente creada:', call);
            call.on('stream', (remoteStream) => {
                console.log('Stream remoto recibido en la llamada saliente:', remoteStream);
                setvideoMute(true);
                setaudioMute(true);
                setvideoMute(true);
                setIsVolumeOn(true)
                setRemoteStream(remoteStream);
            });
            setCallInProgress(true);
        } catch (error) {
            console.error('Error al iniciar la llamada saliente:', error);
            setError('Error al iniciar la llamada saliente. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    const endCall = () => {
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
            setLocalStream(null);
        }
        if (remoteStream) {
            setRemoteStream(null);
        }
        setCallInProgress(false);
        window.location.href = 'https://www.google.com'; // Redirigir a google.com después de colgar la llamada
    };
    

    return (
        <div className="ContenCall">
            <Headings />
            <NavBar />

            <div className='full_screen'>
                <div className="contenPantalla">
                <div className="Video_Entrante">
                {remoteStream ? (
                            <video className="VideoCall" autoPlay ref={(video) => {
                                if (video && remoteStream) {
                                    video.srcObject = remoteStream;
                                    video.muted = !isVolumeOn; // Mute the video based on isVolumeOn
                                }
                            }} />
                        ) : (
                            <i className="fas fa-video-slash custom-icon no-video-icon"></i>
                        )}
                
                </div>

                    <div className="InfoCall">
                    <div className="Video_saliente">
  {videoMute ? (
    localStream && <video className="VideoCall" autoPlay muted={true} ref={(video) => { if (video) video.srcObject = localStream; }} />
  ) : (
    <i className="fas fa-video-slash custom-icon no-video-icon"></i>
  )}
</div>

                        <div className="container">
                            
                            <div className="video-call-icons">
                            <div className="icon-wrapper" onClick={toggleVolume}>
                                    {isVolumeOn ? <i className="fas fa-volume-up"></i> : <i className="fas fa-volume-mute"></i>}
                                </div>
                                <div className="icon-wrapper" onClick={toggleAudioMute}>
                                    {audioMute ? <i className="fas fa-microphone" /> : <i className="fas fa-microphone-slash" />}
                                </div>

                                {!callInProgress ? (
                                <div className="icon-wrapper" onClick={startOutgoingCall}>
                                    <i className="fas fa-phone"></i>
                                </div>
                            ) : (
                                <div className="icon-wrapper" onClick={endCall}>
                                    <i className="fas fa-phone-slash"></i>
                                </div>
                            )}

                            </div>
                            <div className="video-call-icons">
                            <div className="icon-wrapper" onClick={toggleVideoMute}>                                    
                                {videoMute ? <i className="fas fa-video" /> : <i className="fas fa-video-slash" />}
                            </div>
                            <div className="icon-wrapper" onClick={handleFullScreen}>
                                    {isFullScreen ? <i className="fas fa-compress"></i> : <i className="fas fa-expand"></i>}
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
