import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import './Settings.css';
import Saldo from '../Saldo/saldo'; // Asegúrate de que este componente esté correctamente importado

const Settings = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [accountName, setAccountName] = useState('');
  const [bankName, setBankName] = useState('');
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [price, setPrice] = useState(0);

  const serverURL = useSelector(state => state.serverURL.url);
  const userDataString = localStorage.getItem('userData');
  const userData = JSON.parse(userDataString);

  const iconRef = useRef(null);
  const menuRef = useRef(null);
  const modalRef = useRef(null);

  const extraerNumero = (cadena) => {
    const coincidencias = cadena.match(/\d+/g);
    return coincidencias ? parseInt(coincidencias.join(''), 10) : null;
  };

  const balanceElement = document.querySelector('.balance-amount');
    const balanceText = balanceElement ? balanceElement.textContent : '$0 USD';
    const balanceAmount = parseFloat(balanceText.replace(/[^0-9.]/g, ''));


  const toggleMenu = () => {
    setShowMenu(prev => !prev);
  };

  const openModal = (content) => {
    setModalContent(content);
    setShowMenu(false);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent('');
  };

  const fetchBankDetails = async (userId) => {
    try {
      const response = await axios.get(`${serverURL}/user/${userId}/bank-details`);
      if (response.data) {
        setBankName(response.data.bank || '');
        setAccountName(response.data.bank_account || '');
      }
    } catch (error) {
      console.error('Error getting bank details:', error);
    }
  };

  useEffect(() => {
    if (userData && userData.id) {
      fetchBankDetails(userData.id);
    }
    setPrice(extraerNumero(userData.price));
  }, []);

  const handleAddAccount = async () => {
    if (!accountName || !bankName) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const data = {
      bank: bankName,
      bank_account: accountName
    };

    try {
      await axios.put(`${serverURL}/user/${userData.id}/bank-details`, data);
      closeModal();
    } catch (error) {
      console.error('Error al agregar cuenta:', error.response?.data || error.message);
    }
  };

  const handleWithdraw = async () => {
    

 

    if (!withdrawalAmount) {
      Swal.fire({
        icon: 'warning',
        title: 'Cantidad Requerida',
        text: 'Please enter an amount.'
      });
      return;
    }

    if (withdrawalAmount < 20) {
      Swal.fire({
        icon: 'warning',
        title:'Retiro insuficiente',
        text: 'El monto del retiro debe ser de al menos $20.'
      });
      return;
    }

    if (withdrawalAmount > balanceAmount) {
      Swal.fire({
        icon: 'warning',
        title: 'Saldo insuficiente',
        text: 'El monto ingresado excede su saldo disponible.'
      });
      return;
    }

    const formatAmount = (amount) => `$${amount.toLocaleString()}`;

    const adminEmailContent = `
      <html>
      <body>
        <h1 style="color: #007bff;">¡Nuevo Retiro Solicitado!</h1>
        <p>¡Hola!</p>
        <p>Se ha recibido una solicitud de retiro con los siguientes detalles:</p>
        <p><strong>Nombre del Usuario:</strong> ${userData.name}</p>
        <p><strong>ID del Usuario:</strong> ${userData.id}</p>
        <p><strong>Precio por Clase:</strong> ${formatAmount(price)}</p>
        <p><strong>Monto del Retiro:</strong> ${formatAmount(withdrawalAmount)}</p>
        <p>Por favor, revisa el pedido y procede con el procesamiento.</p>
        <p>Saludos,<br/>El equipo de Torii</p>
      </body>
      </html>
    `;

    const userEmailContent = `
      <html>
      <body>
        <h1 style="color: #007bff;">¡Tu Retiro ha sido Programado Exitosamente!</h1>
        <p>¡Hola ${userData.name}!</p>
        <p>Tu solicitud de retiro por un monto de ${formatAmount(withdrawalAmount)} ha sido recibida y está siendo procesada.</p>
        <p>Recuerda que el tiempo de procesamiento puede variar, pero te notificaremos cuando el retiro se haya completado.</p>
        <p>¡Gracias por ser parte de nuestro equipo de tutores!</p>
        <p>Saludos,<br/>El equipo de Torii</p>
      </body>
      </html>
    `;

    const emailDataAdmin = {
      to: 'teamtoriiapp@gmail.com',
      subject: 'Nuevo Retiro Solicitado - Torii',
      text: adminEmailContent
    };

    const emailDataUser = {
      to: userData.email,
      subject: 'Confirmación de Retiro - Torii',
      text: userEmailContent
    };

    try {
      await axios.post(`${serverURL}/email/enviar-email`, emailDataAdmin);
      await axios.post(`${serverURL}/email/enviar-email`, emailDataUser);

      Swal.fire({
        icon: 'success',
        title: 'Solicitud de Retiro Exitosa!',
        text: 'Tu solicitud ha sido recibida y sera efectuada lo más pronto posible!'
      }).then(() => {
        // Puedes cerrar un modal aquí si es necesario
        // closeModal();
      });

    } catch (error) {
      console.error('Error durante el proceso de retiro:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'hubo un error con tu solicitud. Por favor intente mas tarde.'
      });
    }
  };

  useEffect(() => {
    const updateMenuPosition = () => {
      if (showMenu && iconRef.current && menuRef.current) {
        const iconRect = iconRef.current.getBoundingClientRect();
        menuRef.current.style.top = `${iconRect.bottom + window.scrollY + 7}px`;
        menuRef.current.style.left = `${iconRect.left + window.scrollX}px`;
      }
    };

    // Actualizar la posición del menú inicialmente y en los eventos de scroll y resize
    updateMenuPosition();
    window.addEventListener('scroll', updateMenuPosition);
    window.addEventListener('resize', updateMenuPosition);

    // Limpiar los eventos al desmontar el componente
    return () => {
      window.removeEventListener('scroll', updateMenuPosition);
      window.removeEventListener('resize', updateMenuPosition);
    };
  }, [showMenu]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && !iconRef.current.contains(event.target)) {
        setShowMenu(false);
      }
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
    
     
  <div className="menu-Settings" ref={menuRef}>
    <button className="menu-item mas " onClick={() => openModal('account')}>
       <img src="/pagos/mas.png" alt="TORII" />
    </button>

    {balanceAmount > 20 && (
        <button className="menu-item pagoimg" onClick={() => openModal('withdrawal')}>
          <img src="/pagos/Capa_1.png" alt="TORII" />
        </button>
    )}
</div>
      
      {showModal && (
        <div className="modal" ref={modalRef}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            {modalContent === 'account' && (
              <div className="tab-content">
                <form onSubmit={(e) => e.preventDefault()}>
                  <label className='TexPay' htmlFor="accountName">Agregue una cuenta de ahorros para el pago..</label>
                  <div className='Continputpay'>
                    <input
                      className='inputpay'
                      type="text"
                      id="BankName"
                      placeholder="Banco"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                    />
                    <input
                      className='inputpay accountnumber'
                      type="number"
                      id="accountName"
                      placeholder="Número de cuenta"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                    />
                  </div>
                  <button className='buttonplay' type="button" onClick={handleAddAccount}>
                   Solicitar Pago
                  </button>
                </form>
              </div>
            )}
            {modalContent === 'withdrawal' && (
              <div className="tab-content">
                <form>
                  <label className='TexPay' htmlFor="withdrawalAmount">Monto del retiro:</label>
                  <div className='pay'>
                    <Saldo />
                  </div>
                  <div className='Continputpay'>
                    <input
                      className='inputpay'
                      type="number"
                      id="withdrawalAmount"
                      placeholder="Monto a retirar"
                      value={withdrawalAmount}
                      onChange={(e) => setWithdrawalAmount(e.target.value)}
                    />
                  </div>
                  <button className='buttonplay' type="button" onClick={handleWithdraw}>
                  Retirar
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
