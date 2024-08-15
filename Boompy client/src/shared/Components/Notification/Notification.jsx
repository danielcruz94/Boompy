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

  console.log(userData.user)
  const closeModal = () => {
    setShowModal(false);
  };

  const videoUrl = videoUrls[language] || ''; 
  const description = textDescriptions[language] || 'No description available for the selected language.';

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
              <video className="notification-Video" controls>
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
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

// Define propTypes para validar las props del componente
Notification.propTypes = {
  numMessages: PropTypes.number.isRequired,
  messageIcon: PropTypes.node.isRequired, // `node` permite cualquier cosa que pueda ser renderizada (texto, elementos, etc.)
  userData: PropTypes.shape({
    user: PropTypes.shape({
      language: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Notification;
