import React, { useState, useEffect, useRef } from 'react';
import './Calls.css';
import { peer } from '../../../src/shared/Components/Calls/WebRTCManager';
import { Headings } from '../Landing.style';
import NavBar from '../../shared/NavBar/NavBar';
import Footer from '../../shared/Components/Footer/Footer';
import LlamadaComponent from '../../../src/shared/Components/Calls/Llamar';

const Calls = () => {

    const [incomingCall, setIncomingCall] = useState(null);
    const [outgoingStream, setOutgoingStream] = useState(null);
    const incomingVideoRef = useRef(null);
    const outgoingVideoRef = useRef(null);

    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [isVolumeOn, setIsVolumeOn] = useState(true);
    const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);
    const [isCallActive, setIsCallActive] = useState(false);

    

    useEffect(() => {
        peer.on('call', call => {
            setIncomingCall(call);

            call.on('stream', stream => {
                if (incomingVideoRef.current) {
                    incomingVideoRef.current.srcObject = stream;
                }
            });
        });
    }, []);

    useEffect(() => {
        const constraints = {
            audio: true,
            video: true,
        };

        
        let stream = null;

        const startVideo = async () => {
            
            try {
                stream = await navigator.mediaDevices.getUserMedia(constraints);
                setOutgoingStream(stream);
                if (outgoingVideoRef.current) {
                    outgoingVideoRef.current.srcObject = stream; 
                                     
                }
            } catch (err) {
                console.error('Error accessing camera:', err);
            }
        };

        const stopVideo = () => {
            if (outgoingStream) {
                const tracks = outgoingStream.getTracks();
                tracks.forEach(track => {
                    track.stop();
                });
            }
        };

        if (isCameraOn) {
            startVideo();
        } else {
            stopVideo();
        }

        return () => {
            stopVideo();
        };       

    }, [isCameraOn]);

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

    const toggleCamera = () => {
        setIsCameraOn(prevState => !prevState);
    };
    


    const toggleVolume = () => {
        const videoElement = outgoingVideoRef.current;
        if (videoElement) {
            videoElement.muted = !isVolumeOn;
        }
        setIsVolumeOn(prevState => !prevState);
    };

    const toggleMicrophone = () => {
        const videoElement = outgoingVideoRef.current;
        if (videoElement) {
            const audioTracks = videoElement.srcObject.getAudioTracks();
            audioTracks.forEach(track => {
                track.enabled = isMicrophoneOn;
            });
        }
        setIsMicrophoneOn(prevState => !prevState);
    };

    const endCall = () => {
        setIsCallActive(false);
        // Realizar cualquier limpieza necesaria
        // Detener el stream de video y finalizar la conexión PeerJS, si es necesario
    };

    return (
        <div className="ContenCall">
            <Headings />
            <NavBar />
            <LlamadaComponent       
        isCameraOn={isCameraOn}
        setIsCameraOn={setIsCameraOn}
        />




            <div className='full_screen'>
                <div className="contenPantalla">
                    <div className="Video">
                        {incomingCall ? (
                            <video ref={incomingVideoRef} className="VideoCall" autoPlay playsInline muted></video>
                        ) : (
                            <i className="fas fa-video-slash custom-icon no-video-icon"></i>
                        )}
                    </div>
                    <div className="InfoCall">
                        <div className="DivCall">















                          {isCameraOn ? (
                                    <div>
                                        <video className="VideoCall" autoPlay playsInline muted={!incomingCall} ref={outgoingVideoRef}></video>
                                       
                                    </div>
                                ) : (
                                    <div>
                                        <i className="fas fa-video-slash custom-icon no-video-icon"></i>
                                        
                                    </div>
                                )}


























                        </div>
                        <div className="container">
                            <div className="video-call-icons">
                                <div className="icon-wrapper" onClick={toggleVolume}>
                                    {isVolumeOn ? <i className="fas fa-volume-up"></i> : <i className="fas fa-volume-mute"></i>}
                                </div>
                                <div className="icon-wrapper" onClick={toggleMicrophone}>
                                    {isMicrophoneOn ? <i className="fas fa-microphone"></i> : <i className="fas fa-microphone-slash"></i>}
                                </div>
                                <div className="icon-wrapper">
                                    {isCallActive ? (
                                        <i className="fas fa-phone"></i>
                                    ) : (
                                        <i className="fas fa-phone-slash" onClick={endCall}></i>
                                    )}
                                </div>
                            </div>
                            <div className="video-call-icons">
                                <div className="icon-wrapper" onClick={toggleCamera}>

                                    
                                {isCameraOn ? (
                                    <>
                                        <i className="fas fa-video" />
                                       
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-video-slash" />
                                       
                                    </>
                                )}







                                </div>
                                <div className="icon-wrapper" onClick={handleFullScreen}>
                                    {isFullScreen ? <i className="fas fa-compress"></i> : <i className="fas fa-expand"></i>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Calls;