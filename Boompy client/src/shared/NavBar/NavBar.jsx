import React, { useState, useEffect } from 'react';
import { ContainerBar, ContainerNavBar, Image, SubHeading, SubmitButton, Bottom } from '../../views/Landing.style';
import { useSelector ,connect} from "react-redux";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import StudentCalendar from '../Components/Calendar/Student_Calendar';
import CalendarClass from '../Components/Calendar/Calendar_Class';
import Carrito from '../../assets/carrito.svg';
import Corazon from '../../assets/corazon.svg';
import Button from '../../assets/Button.svg';
import Vector from '../../assets/Vector.svg'; 
import Torii from '../../assets/torii.png'
import Notification from '../Components/Notification/Notification';
import Settings from '../Components/Settings/Settings';
import AttendanceModal from '../Components/History/History';

const NavBar = ({ textBotton, onClick, userInfo,auth }) => {
  
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); 
  const [IdUSer, setIduser] = useState("0"); 
  const [Price, setPrice] = useState(0);  

  const userData = auth;

  const [role, setRole] = useState(userData?.role);   
  const currentUrl = window.location.href;    
  const shouldHideButton = currentUrl.includes('calls');



  // const auth = useSelector((state) => state.auth);

 const navegate =useNavigate()


  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (userData.user) {
      if(userData.user.role != undefined){
        setRole(userData.user.role);
        setIduser(userData.user.id);
        if(userData.user.price != ""){
           setPrice(userData.user.price)
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
 

  // Verifica si la ruta actual coincide con '/calls/:id'
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

  return (
    <ContainerBar>
      <Image>
        <img src={Torii} style={{ width: '50px' }} alt="logo" />
        {/* <b><p>{userInfo?.name}</p></b> */}
      </Image>
      <div style={{ display: 'flex' }}>
        {/* Condicional para mostrar el enlace a '/home' o un texto inactivo */}
        {isCallsActive ? (
          <SubHeading style={{ color: 'grey', fontWeight: 'bold' }}>Home</SubHeading>
        ) : (
          <Link to={"/home"}>
            {role === 'Tutor' ? "" : <SubHeading style={{ color: 'black', fontWeight: 'bold' }}>Home</SubHeading>}
          </Link>
        )}
        {/* Elemento para mostrar el calendario */}
        <SubHeading
          onClick={toggleCalendar}
          style={{ cursor: 'pointer', fontWeight: 'bold' }}
        >
          Calendar
        </SubHeading>
      </div>

      <ContainerNavBar>
        {/* Elementos adicionales del NavBar */}
        <img src={Vector} alt="vector" />
        <p style={{ marginLeft: '6px' }}>Categories</p>
        <SubmitButton placeholder="Search your partner"></SubmitButton>
        <img src={Button} style={{ width: '10px' }} alt="button" />
      </ContainerNavBar>

      {/* Sección inferior del NavBar */}
      <div style={{ display: 'flex', gap: '5px' }}>       
          {
            <Notification
              numMessages={1}
              messageIcon={<i className="fa fa-envelope IconNavbar" />}
              messageContent="Contenido del mensaje aquí..."
            />            
          }   
          {role === 'Tutor' && <Settings />}


          <AttendanceModal
                userId={IdUSer}
                price={extraerNumero(Price)}
            />





          {!shouldHideButton && <Bottom onClick={onClick}>{textBotton}</Bottom>}
       </div>

      {/* Componente del calendario que se muestra si isCalendarOpen es true */}
      {isCalendarOpen && <CalendarComponent isOpen={isCalendarOpen} onRequestClose={closeCalendar} onClose={closeCalendar} />}
    </ContainerBar>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
 
 
});

export default connect(mapStateToProps)(NavBar);