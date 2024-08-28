import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './Notification.css'; 

const Notification = ({ numMessages, messageIcon, userData }) => {
  const [showModal, setShowModal] = useState(false);
  const [language, setLanguage] = useState('');
  const [tutorial, setTutorial] = useState(false); 

  const serverURL = useSelector(state => state.serverURL.url); 

  const iframeUrls = {
    English: 'https://drive.google.com/file/d/1f_tAAHEy9d82ARzUkHnZiJyJJrfFSmt0/preview',
    Spanish: 'https://drive.google.com/file/d/1VkOH0Z-JOMY1CtzkRgeYsgsdO6XCbZBH/preview',   
  };

  const textDescriptions = {
    English: "This video explains how to have a conversation on the Torii platform.",
    Spanish: "Este video explica cómo tener una conversación en la plataforma Torii."
  };

  const updateTutorial = async () => {
    if (userData.user && tutorial === false) {  
      try {
        const response = await axios.patch(`${serverURL}/user/${userData.user.id}/tutorial`, {
          tutorial: true
        });
        
        setTutorial(response.data.tutorial);       
        const updatedUserData = { ...userData, user: { ...userData.user, tutorial: response.data.tutorial } };
        localStorage.setItem('userData', JSON.stringify(updatedUserData.user));

      } catch (error) {
        console.error('Error updating tutorial status:', error);
      }
    }
  };

  useEffect(() => {
    if (userData && userData.user) {
      setLanguage(userData.user.language || '');
      setTutorial(userData.user.tutorial);
    }
  }, [userData]);
    
  useEffect(() => {
    if (showModal) {
      updateTutorial();
    }
  }, [showModal]); 

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
        {!tutorial && (
          <span className="badge">{numMessages}</span>
        )}
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
      tutorial: PropTypes.bool.isRequired, 
      id: PropTypes.string.isRequired, 
    }).isRequired,
  }).isRequired,
};

export default Notification;
