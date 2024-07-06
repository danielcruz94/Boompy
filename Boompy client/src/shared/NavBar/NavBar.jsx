import React, { useState } from 'react';
import { 
    ContainerBar, 
    ContainerNavBar, 
    Image, 
    SubHeading, 
    SubmitButton, 
    Bottom 
} from '../../views/Landing.style';

import {logout} from '../../Redux/authSlice'
import { useSelector,useDispatch } from "react-redux"
import { useNavigate} from 'react-router-dom';
 
import Vector from '../../assets/Vector.svg'


import { Link } from 'react-router-dom';
import StudentCalendar from '../Components/Calendar/Student_Calendar'; 

import CalendarClass from '../Components/Calendar/Calendar_Class'; 
import Carrito from '../../assets/carrito.svg';
import Corazon from '../../assets/corazon.svg'
import  Button  from '../../assets/Button.svg'


const NavBar = ({ textBotton, onClick, userInfo }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); 

 
const userDataString = localStorage.getItem('userData');
const userData = JSON.parse(userDataString);

  const [role, setRole] = useState(userData.role); 

  

  const auth = useSelector((state) => state.auth);
 const dispatch=useDispatch()
 const navegate =useNavigate()

 
 



  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen); 
  };

  const closeCalendar = () => {
    setIsCalendarOpen(false);
  };

  
  const handleRoleChange = (newRole) => {
    setRole(newRole);
   
    closeCalendar();
  };

  
  const CalendarComponent = role === 'Tutor' ? CalendarClass : StudentCalendar;

  return (
    <ContainerBar>
      <Image>
        <img src="https://res.cloudinary.com/danielcruz/image/upload/v1716001393/images/c5bvvai78sokoqml83fk.png" style={{width:'50px'}} alt="logo" />
        <b><p>{userInfo?.name}</p></b>
      </Image>
      <div style={{ display: 'flex' }}>
        <Link to={"/home"}>
          {role==='Tutor'?"":<SubHeading style={{color:'black',fontWeight: 'bold'}}>Home</SubHeading>}
          
        </Link>
        {/* <SubHeading>Messages</SubHeading> */}
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
        <img src={Corazon} alt="corazon" />
        <img src={Carrito} alt="carrito" />

        <Bottom onClick={onClick}>{textBotton}</Bottom>


      </div>

      {isCalendarOpen && <CalendarComponent isOpen={isCalendarOpen} onRequestClose={closeCalendar} onClose={closeCalendar} />}
    </ContainerBar>
  );
};

export default NavBar;
