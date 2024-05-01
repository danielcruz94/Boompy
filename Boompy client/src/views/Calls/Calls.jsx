import React, { useState, useEffect } from 'react';
import './Calls.css'; // Suponiendo que tengas un archivo CSS llamado Calls.css para estilizar

import { Headings } from '../Landing.style';
import NavBar from '../../shared/NavBar/NavBar';
import Footer from '../../shared/Components/Footer/Footer';

const Calls = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [isVolumeOn, setIsVolumeOn] = useState(true);
    const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);

    useEffect(() => {
        const constraints = {
            audio: true,
            video: true,
        };

        let stream = null;

        const startVideo = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia(constraints);
                const videoElement = document.getElementById('videoElement');
                if (videoElement) {
                    videoElement.srcObject = stream;
                }
            } catch (err) {
                console.error('Error accessing camera:', err);
            }
        };

        const stopVideo = () => {
            if (stream) {
                const tracks = stream.getTracks();
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
        const videoElement = document.getElementById('videoElement');
        if (videoElement) {
            videoElement.muted = !isVolumeOn;
        }
        setIsVolumeOn(prevState => !prevState);
    };

    const toggleMicrophone = () => {
        const videoElement = document.getElementById('videoElement');
        if (videoElement) {
            const audioTracks = videoElement.srcObject.getAudioTracks();
            audioTracks.forEach(track => {
                track.enabled = isMicrophoneOn;
            });
        }
        setIsMicrophoneOn(prevState => !prevState);
    };

    return (
        <div className="ContenCall">
            <Headings />
            <NavBar />

            <div className='full_screen'>
                <div className="contenPantalla">
                    <div className="Video">
                        <i className="fas fa-video-slash custom-icon no-video-icon"></i>
                    </div>
                    <div className="InfoCall">
                        <div className="DivCall">
                            {isCameraOn ? (
                                <video id="videoElement" className="VideoCall" autoPlay playsInline muted></video>
                            ) : (
                                <i className="fas fa-video-slash custom-icon no-video-icon"></i>
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
                                    <i className="fas fa-volume-up"></i>
                                </div>
                            </div>

                            <div className="video-call-icons">
                                <div className="icon-wrapper" onClick={toggleCamera}>
                                    {isCameraOn ? <i className="fas fa-video"></i> : <i className="fas fa-video-slash"></i>}
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
