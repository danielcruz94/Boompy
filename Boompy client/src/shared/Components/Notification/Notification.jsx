import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Notification.css'; 

const Notification = ({ numMessages, messageIcon, userData }) => {
  const [showModal, setShowModal] = useState(false);
  const [language, setLanguage] = useState('');
  
  // Define las URLs de los iframes para cada idioma
  const iframeUrls = {
    English: 'https://drive.google.com/file/d/1HKGsKgEbFZMRk7l64qf412qpYKMyeaZM/preview',
    Spanish: 'https://drive.google.com/file/d/1VkOH0Z-JOMY1CtzkRgeYsgsdO6XCbZBH/preview',   
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

  const iframeUrl = iframeUrls[language] || ''; 
  const description = textDescriptions[language] || '';

  return (
    <div>
      <div className="notification-icon" onClick={openModal}>
        {messageIcon}
        <span className="badge">{numMessages}</span>
      </div>
      {showModal && (
        <div className="modal-Notification">
          <div className="content-Notification">
            <span className="close" onClick={closeModal}>&times;</span>
            <p className="description">{description}</p>
            {iframeUrl ? (
              <iframe 
                src={iframeUrl} 
                className="iframeVideo"
                allow="autoplay" 
                title="Notification Video"
              ></iframe>
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
