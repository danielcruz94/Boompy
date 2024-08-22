// components

import './App.css'

//libraries

import { Routes, Route,useNavigate,useLocation} from 'react-router-dom';
// components

import Login from "./views/Login";
import Home from "./views/Home"
import Landing from "./shared/Components/Landing/Landing";
import Instagram from "./shared/Components/Instagram/instagram";
import PrivacyPolicy from "./shared/Components/politicas/PrivacyPolicy";
import TermsService from "./shared/Components/politicas/TermsService";
import Deleteimg from "./shared/Components/politicas/delete";
import Error from "./views/Error/Error";
import Teach from './views/Teach/Teach';
import Calls from './views/Calls/Calls';
import Signup from "./views/SignUp/Signup";
import {  useDispatch } from 'react-redux';
import  {useEffect,React}from "react"
import  {loadUser} from "./Redux/authSlice"




function App() {
  const navegate = useNavigate();
  const dispatch=useDispatch();
  const location = useLocation();

useEffect(() =>{
 
const storedString = localStorage.getItem('userData');
if (storedString !== null) {
  // El valor existe, procede a la conversión
const userObject = JSON.parse(storedString);
dispatch(loadUser(userObject))
// Verificar si la ruta actual contiene 'instagram' o empieza con '/calls/'
const isInstagramPath = location.pathname.includes('instagram');
const isprivacyPath = location.pathname.includes('privacy');
const isservicePath = location.pathname.includes('service');
const isdeletePath = location.pathname.includes('delete');
const isCallsPath = /\/calls\/.*/.test(location.pathname);

if (!isInstagramPath && !isCallsPath && !isprivacyPath && !isservicePath && !isdeletePath) {
  navegate("/home");
}




  
}

},[])



  return (
    <Routes>      
      <Route path='/' element={<Landing />} />
      <Route path='/login' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/instagram' element={<Instagram />} />
      <Route path='/instagram/:code' element={<Instagram />} />
      <Route path='/privacy' element={<PrivacyPolicy />} />
      <Route path='/service' element={<TermsService />} />
      <Route path='/delete' element={<Deleteimg/>} />
      <Route path='/tutor/:id' element={<Teach />} />
      <Route path='/calls/:id' element={<Calls />} />
      <Route path='*' element={<Error />} />
      {/* <PrivateRoute path="/home" component={<Home></Home>}  /> */}

    </Routes>
  )
}

export default App
