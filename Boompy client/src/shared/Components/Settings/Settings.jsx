import React, { useState } from 'react';
import './Settings.css'; // Importa el archivo CSS donde tendrás los estilos para los ajustes

const Settings = () => {
  const [showModal, setShowModal] = useState(false);
  const [accountName, setAccountName] = useState('');

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleAddAccount = () => {
    console.log(`Cuenta ${accountName} agregada exitosamente`);
    // Aquí podrías realizar lógica adicional, como enviar datos al servidor, etc.
    closeModal(); // Cierra el modal después de agregar la cuenta
  };

  return (
    <div>
      <div className="settings-icon" onClick={openModal}>
        <i className="fa fa-cog" /> {/* Aquí puedes ajustar el ícono de engrane */}
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>          
            <form>
              <label htmlFor="accountName">add payment account:</label>
              <input
                className='inputpay'
                type="text"
                id="accountName"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
              />
              <button className='buttonplay' type="button" onClick={handleAddAccount}>
                Agregar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
