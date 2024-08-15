import React, { useState, useEffect } from 'react';
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
  const description = textDescriptions[language] || 'No description available for the selected language.';

  return (
    <div>
      <div className="notification-icon" onClick={openModal}>
        {messageIcon} {/* Aquí deberías pasar el icono como componente o imagen */}
        <span className="badge">{numMessages}</span> {/* Número de mensajes */}
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
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

export default Notification;
