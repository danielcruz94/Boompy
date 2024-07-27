import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './Settings.css'; 

const Settings = () => {
  const [showModal, setShowModal] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [bankName, setBankName] = useState('');

  const serverURL = useSelector(state => state.serverURL.url);
 
  const userDataString = localStorage.getItem('userData');
  const userData = JSON.parse(userDataString);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
 
  const fetchBankDetails = async (userId) => {
    try {
      const response = await axios.get(`${serverURL}/user/${userId}/bank-details`);  
     
      if (response.data) {
        setBankName(response.data.bank || '');
        setAccountName(response.data.bank_account || '');
      }

    } catch (error) {
      console.error('Error al obtener detalles bancarios:', error);
    }
  };
  
  useEffect(() => {
    if (userData && userData.id) {
      fetchBankDetails(userData.id);
    }
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
      const response = await axios.put(`${serverURL}/user/${userData.id}/bank-details`, data);
      
      closeModal(); 
    } catch (error) {     
      if (error.response) {       
        console.error('Error al agregar cuenta:', error.response.data);
      } else if (error.request) {       
        console.error('Error de red:', error.request);
      } else {        
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <div>
      <div className="settings-icon" onClick={openModal}>
        <i className="fa fa-cog IconNavbar" /> 
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <form>
              <label htmlFor="accountName">Add savings account for payment.</label>
              <input
                className='inputpay'
                type="text"
                id="BankName"
                placeholder="Bank"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />

              <input
                className='inputpay accountnumber'
                type="number"
                id="accountName"
                placeholder="Account Number"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
              />
              <button className='buttonplay' type="button" onClick={handleAddAccount}>
              Add and update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
