import React, { useState } from 'react';
 import { 
    ContainerBar, 
    ContainerNavBar, 
    Image, 
    SubHeading, 
    SubmitButton, 
    Bottom 
 } from '../../views/Landing.style';
import Vector from '../../../../imagenes/Vector.svg';
import Header from '../../../../imagenes/Header.svg';
import Button from '../../../../imagenes/Button.svg';
import corazon from '../../../../imagenes/corazon.svg';
import carrito from '../../../../imagenes/carrito.svg';
import { Link } from 'react-router-dom';
import StudentCalendar from '../Components/Calendar/Student_Calendar'; 

const NavBar = ({ textBotton, onClick, userInfo }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); 

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen); 
  };

  return (
    <ContainerBar>
      <Image>
        <img src={Header} alt="logo" />
        <b><p>{userInfo?.name}</p></b>
      </Image>
      <div style={{ display: 'flex' }}>
        <Link to={"/home"}>
          <SubHeading>Home</SubHeading>
        </Link>
        <SubHeading>Lenguages</SubHeading>
       
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
        <SubmitButton placeholder="Search your partner"></SubmitButton>
        <img src={Button} style={{ width: '10px' }} alt="button" />
      </ContainerNavBar>
      <div style={{ display: 'flex', gap: '5px' }}>
        <img src={corazon} alt="corazon" />
        <img src={carrito} alt="carrito" />
        <Bottom onClick={onClick}>{textBotton}</Bottom>
      </div>

      {isCalendarOpen && <StudentCalendar isOpen={isCalendarOpen} onClose={toggleCalendar} />}
    </ContainerBar>
  )
}

export default NavBar;
