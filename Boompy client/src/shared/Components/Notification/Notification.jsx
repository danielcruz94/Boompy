import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes para la validación
import './Notification.css'; 

const Notification = ({ numMessages, messageIcon, userData }) => {
  const [showModal, setShowModal] = useState(false);
  const [language, setLanguage] = useState('');
  
  // Define las URLs de los videos para cada idioma
  const videoUrls = {
    English: '../../../../public/Videos/Ingles.mp4',
    Spanish: '../../../../public/Videos/español.mp4' 
  };

  // Define los textos para cada idioma
  const textDescriptions = {
    English: "This video explains how to have a conversation on the Torii platform.",
    Spanish: "Este video explica cómo tener una conversación en la plataforma Torii."
  };

  useEffect(() => {
    if (userData && userData.user && userData.user.language) {
      setLanguage(userData.user.language);      
    } else {
      setLanguage('');      
    }
  }, [userData]);

  const openModal = () => {
    setShowModal(true);   
  };

  const closeModal = () => {
    setShowModal(false);   
  };

  const videoUrl = videoUrls[language] || ''; 
  const description = textDescriptions[language] || '';

  const handleLoadedMetadata = () => {
    console.log('Metadata del video cargada');
  };

  const handleCanPlay = () => {
    console.log('El video está listo para reproducirse');
  };

  const handleError = (e) => {
    console.error('Error al cargar el video:', e);
    e.target.style.display = 'none'; 
  };

  const handleStalled = () => {
    console.warn('Carga del video estancada');
  };

  const handleAbort = () => {
    console.warn('Carga del video abortada');
  };

  return (
    <div>
      <div className="notification-icon" onClick={openModal}>
        {messageIcon} {/* Aquí deberías pasar el icono como componente o imagen */}
        <span className="badge">{numMessages}</span> {/* Número de mensajes */}
      </div>
      {showModal && (
        <div className="modal-Notification">
          <div className="content-Notification">
            <span className="close" onClick={closeModal}>&times;</span>
            <p className="description">{description}</p>
            {videoUrl ? (
              <video className="notification-Video" controls
                onLoadedMetadata={handleLoadedMetadata}
                onCanPlay={handleCanPlay}
                onError={handleError}
                onStalled={handleStalled}
                onAbort={handleAbort}
              >
                <source src={videoUrl} type="video/mp4" />
                <p>Your browser does not support the video tag.</p>
              </video>
            ) : (
              <p>No video available for the selected language.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

Notification.propTypes = {
  numMessages: PropTypes.number.isRequired,
  messageIcon: PropTypes.node.isRequired, 
  userData: PropTypes.shape({
    user: PropTypes.shape({
      language: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Notification;
