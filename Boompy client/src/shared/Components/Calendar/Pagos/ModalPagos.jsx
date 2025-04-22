import React, { useState } from 'react';
import './ModalPagos.css';

const ModalPagos = ({closepay,RealPrice,puntos,PayPal,PayPoint}) => {
  const [selectedMethod, setSelectedMethod] = useState('points');

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
  };

  const handleClose = () => {
    // Close modal function - would be passed as prop in real implementation
    console.log('Modal closed');
  };

  const handleContinue = () => {
    if (selectedMethod === 'points') {
        PayPoint();
      } else if (selectedMethod === 'paypal') {
        PayPal();
      } else {
        alert('Poner Aca lo de wompi');
      }
    };
    // Process payment logic would go here
  

  return (
    <div className="torii-modal-overlay">
      <div className="torii-modal-container">
        <div className="torii-modal-header">
          <button className="torii-close-button" onClick={closepay}>✕</button>
          <div className="torii-logo-header">
          <img src="/../../../../../public/landing/Icono.png" alt="Logo Torii" className="torii-icon" />
            <h2></h2>
          </div>
          <p>Seleccione método de pago</p>
        </div>
        
        <div className="torii-modal-body">
          <div className="torii-price-info">
            <div className="torii-price-total">{`$ ${RealPrice} USD`}</div>
            <div className="torii-price-points"> {`${puntos} puntos`}</div>
          </div>
          
          <div className="torii-payment-methods">
            <div 
              className={`torii-payment-method ${selectedMethod === 'points' ? 'selected' : ''}`}
              onClick={() => handleSelectMethod('points')}
            >
              <div className="torii-payment-icon">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="#1D2347" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="7" stroke="#E62B3F" strokeWidth="2"/>E62B3F
                  <circle cx="12" cy="12" r="3" fill="#E62B3F"/>
                </svg>
              </div>
              <div className="torii-payment-name">Puntos Torii</div>
            </div>
            
            <div 
              className={`torii-payment-method ${selectedMethod === 'paypal' ? 'selected' : ''}`}
              onClick={() => handleSelectMethod('paypal')}
            >
              <div className="torii-payment-icon">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 18V6C21 4.89543 20.1046 4 19 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18Z" stroke="#1D2347" strokeWidth="2"/>
                  <path d="M3 10H21" stroke="#1D2347" strokeWidth="2"/>
                  <path d="M7 15H12" stroke="#1D2347" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="torii-payment-name">PayPal</div>
            </div>
            
            <div 
              className={`torii-payment-method ${selectedMethod === 'wompi' ? 'selected' : ''}`}
              onClick={() => handleSelectMethod('wompi')}
            >
              <div className="torii-payment-icon">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#1D2347" strokeWidth="2"/>
                  <path d="M9 12L11 14L15 10" stroke="#E62B3F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="torii-payment-name">Wompi</div>
            </div>
          </div>
        </div>
        
        <div className="torii-modal-footer">
          <button className="torii-continue-button" onClick={handleContinue}>
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPagos;