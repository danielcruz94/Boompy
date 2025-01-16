import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from "react-redux";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import StudentCalendar from '../Components/Calendar/Student_Calendar';
import CalendarClass from '../Components/Calendar/Calendar_Class';
import Button from '../../assets/Button.svg';
import Vector from '../../assets/Vector.svg'; 
import Torii from '../../assets/rii (2).svg';
import Notification from '../Components/Notification/Notification';

import AttendanceModal from '../Components/History/History';
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from '../../Redux/usersSlice';
import Points  from '../Components/points/points';

const NavBar = ({ textBotton, onClick, auth }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [IdUSer, setIduser] = useState("0");
  const [Price, setPrice] = useState(0);
  const [searchText, setSearchText] = useState(''); // Estado para el texto de búsqueda

  const userData = auth;
  const [role, setRole] = useState(userData?.role);   
  const currentUrl = window.location.href;    
  const shouldHideButton = currentUrl.includes('calls');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (userData.user) {
      if(userData.user.role !== undefined){
        setRole(userData.user.role);
        setIduser(userData.user.id);
        if(userData.user.price !== ""){
           setPrice(userData.user.price);
        }
      }      
    }
  }, [userData]);

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const closeCalendar = () => {
    setIsCalendarOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const CalendarComponent = role === 'Tutor' ? CalendarClass : StudentCalendar;  

  const isCallsActive = location.pathname.startsWith('/calls/');

  function extraerNumero(cadena) {   
    if (!cadena) {
        return 1;
    }    
    const resultado = cadena.match(/\d+/);    
    if (resultado) {
        return parseInt(resultado[0], 10);
    } else {      
        return 1;
    }
  }

  if (!userData || !userData.user) {
    return <div>Loading...</div>;
  }

  // Filtrar usuarios basado en el texto de búsqueda
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Manejar el cambio en el campo de búsqueda
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="ContainerBar">

           <Link to="/home">
             <img src="/landing/logo.png" alt="TORII" className="Logo_NavBar" />
            </Link>
     
        
      
      <div style={{ display: 'flex' }}>
        {isCallsActive ? (
          <p className="SubHeading" style={{ color: 'grey', fontWeight: 'bold' }}>Home</p>
        ) : (
          <>            
            <Link to="/Ranking">
              {role !== 'Tutor' && <p className="SubHeading" style={{ display: 'none', color: 'black', fontWeight: 'bold' }}>Ranking</p >}
            </Link>
          </>
        )}
             
      

      </div>



      <div className="ContainerNavBar">
        <img src={Vector} alt="vector" />
        <p style={{ marginLeft: '6px' }}>Categories</p>
        <input className="SubmitButton"
          placeholder="Search for tutors."
          value={searchText}
          onChange={handleSearchChange} 
        />
        <img src={Button} style={{ width: '10px' }} alt="button" />
      </div>

     

      <div className="Conten_iconos">    

      {/*<Points/>*/}
       
        <Notification
          numMessages={1}
          messageIcon={<i className="fa-regular fa-envelope IconNavbar"></i>}
          userData={userData}
        />            
          
        {/*
          <AttendanceModal
          userId={IdUSer}
          price={extraerNumero(Price)}
        />
        */}

      

        {!shouldHideButton && <botton className="Bottom" onClick={onClick}>{textBotton}</botton>}
      </div>

      <div className="menu-container">
  <div className="hamburger-menu" onClick={toggleMenu}>
    <i className="fa fa-bars hamburguesa"></i> {/* Icono de la hamburguesa */}
  </div>

  <div className={`menu-items ${isMenuOpen ? 'open' : ''}`}>
    {/* Icono de notificación */}
    <Notification
      numMessages={1}
      messageIcon={<i className="fa-regular fa-envelope IconNavbar"></i>}
      userData={userData}
    /> 
    

    {/* Botón condicional */}
    {!shouldHideButton && (
      <button className="Bottom" onClick={onClick}>
        {textBotton}
      </button>
    )}
  </div>
</div>


      {isCalendarOpen && <CalendarComponent isOpen={isCalendarOpen} onRequestClose={closeCalendar} onClose={closeCalendar} />}
    </div>
  );
};

// Definir propTypes para el componente NavBar
NavBar.propTypes = {
  textBotton: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(NavBar);
