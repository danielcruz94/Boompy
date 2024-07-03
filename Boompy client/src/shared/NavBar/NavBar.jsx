import React, { useState } from 'react';
import { ContainerBar, ContainerNavBar, Image, SubHeading, SubmitButton, Bottom } from '../../views/Landing.style';
import { useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import StudentCalendar from '../Components/Calendar/Student_Calendar';
import CalendarClass from '../Components/Calendar/Calendar_Class';
import Carrito from '../../assets/carrito.svg';
import Corazon from '../../assets/corazon.svg';
import Button from '../../assets/Button.svg';
import Vector from '../../assets/Vector.svg'; // Asegúrate de importar Vector correctamente

const NavBar = ({ textBotton, onClick, userInfo }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const userDataString = localStorage.getItem('userData');
  const userData = JSON.parse(userDataString);
  const [role, setRole] = useState(userData.role);

  const navigate = useNavigate();
  const location = useLocation();

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const closeCalendar = () => {
    setIsCalendarOpen(false);
  };

  const CalendarComponent = role === 'Tutor' ? CalendarClass : StudentCalendar;

  // Verifica si la ruta actual coincide con '/calls/:id'
  const isCallsActive = location.pathname.startsWith('/calls/');

  return (
    <ContainerBar>
      <Image>
        <img src="https://res.cloudinary.com/danielcruz/image/upload/v1716001393/images/c5bvvai78sokoqml83fk.png" style={{ width: '50px' }} alt="logo" />
        <b><p>{userInfo?.name}</p></b>
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
        <img src={Corazon} alt="corazon" />
        <img src={Carrito} alt="carrito" />
        <Bottom onClick={onClick}>{textBotton}</Bottom>
      </div>

      {/* Componente del calendario que se muestra si isCalendarOpen es true */}
      {isCalendarOpen && <CalendarComponent isOpen={isCalendarOpen} onRequestClose={closeCalendar} onClose={closeCalendar} />}
    </ContainerBar>
  );
};

export default NavBar;
