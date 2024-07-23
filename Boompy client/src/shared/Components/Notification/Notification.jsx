import React, { useState } from 'react';
import './Notification.css'; // Importa el archivo CSS donde tendrás los estilos para la notificación

const Notification = ({ numMessages, messageIcon, messageContent }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

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
            <p>{messageContent}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
