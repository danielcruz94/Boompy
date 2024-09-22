import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ContainerBar, ContainerNavBar, Image, SubHeading, SubmitButton, Bottom } from '../../views/Landing.style';
import { connect } from "react-redux";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import StudentCalendar from '../Components/Calendar/Student_Calendar';
import CalendarClass from '../Components/Calendar/Calendar_Class';
import Button from '../../assets/Button.svg';
import Vector from '../../assets/Vector.svg'; 
import Torii from '../../assets/rii (2).svg';
import Notification from '../Components/Notification/Notification';
import Settings from '../Components/Settings/Settings';
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
    <ContainerBar>
      <Image>
        <img src={Torii} style={{ width: '50px' }} alt="logo" />
      </Image>
      <div style={{ display: 'flex' }}>
        {isCallsActive ? (
          <SubHeading style={{ color: 'grey', fontWeight: 'bold' }}>Home</SubHeading>
        ) : (
          <>
            <Link to="/home">
              {role !== 'Tutor' && <SubHeading style={{ color: 'black', fontWeight: 'bold' }}>Home</SubHeading>}
            </Link>
            <Link to="/Ranking">
              {role !== 'Tutor' && <SubHeading style={{ display: 'none', color: 'black', fontWeight: 'bold' }}>Ranking</SubHeading>}
            </Link>
          </>
        )}
        <SubHeading
          onClick={toggleCalendar}
          style={{ cursor: 'pointer', fontWeight: 'bold' }}
        >
          Calendar
        </SubHeading>
      </div>


      <ContainerNavBar>
        <img src={Vector} alt="vector" />
        <p style={{ marginLeft: '6px' }}>Categories</p>
        <SubmitButton
          placeholder="Search for tutors."
          value={searchText}
          onChange={handleSearchChange} // Actualizar el estado cuando cambia el texto
        />
        <img src={Button} style={{ width: '10px' }} alt="button" />
      </ContainerNavBar>

     

      <div style={{ display: 'flex', gap: '5px' }}>    

      <Points/>
       
        <Notification
          numMessages={1}
          messageIcon={<i className="fa fa-envelope IconNavbar" />}
          userData={userData}
        />            
          
        <AttendanceModal
          userId={IdUSer}
          price={extraerNumero(Price)}
        />

        {role === 'Tutor' && <Settings />}

        {!shouldHideButton && <Bottom onClick={onClick}>{textBotton}</Bottom>}
      </div>

      {isCalendarOpen && <CalendarComponent isOpen={isCalendarOpen} onRequestClose={closeCalendar} onClose={closeCalendar} />}
    </ContainerBar>
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
