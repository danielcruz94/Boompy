// components

import './App.css'

//libraries

import { Routes, Route, Navigate} from 'react-router-dom';
// components

import Login from "./views/Login";
import Home from "./views/Home"
import Landing from "./shared/Components/Landing/Landing";
import Error from "./views/Error/Error";
import Teach from './views/Teach/Teach';
import Calls from './views/Calls/Calls';
import Signup from "./views/SignUp/Signup";
import {  useDispatch,useSelector } from 'react-redux';
import  {useEffect,React,useState}from "react"
import  {loadUser} from "./Redux/authSlice"
import {useNavigate} from 'react-router-dom';


function App() {
  const navegate = useNavigate();
  const dispatch=useDispatch();

useEffect(() =>{
 
const storedString = localStorage.getItem('userData');
if (storedString !== null) {
  // El valor existe, procede a la conversión
  const userObject = JSON.parse(storedString);
dispatch(loadUser(userObject))
navegate("/home")

  ; // Imprimir el objeto convertido
}

},[])

 

  return (
    <Routes>      
      <Route path='/' element={<Landing />} />
      <Route path='/login' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='https://boompy.vercel.app/signup' element={<Signup />} />
      <Route path='/tutor/:id' element={<Teach />} />
      <Route path='/calls/:id' element={<Calls />} />
      <Route path='*' element={<Error />} />
      {/* <PrivateRoute path="/home" component={<Home></Home>}  /> */}

    </Routes>
  )
}

export default App
