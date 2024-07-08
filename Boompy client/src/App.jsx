// components

import './App.css'

//libraries

import { Routes, Route,useNavigate,useLocation} from 'react-router-dom';
// components

import Login from "./views/Login";
import Home from "./views/Home"
import Landing from "./shared/Components/Landing/Landing";
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
const pathRegex = /\/calls\/.*/; // Regular expression for paths starting with "/calls/"
const isCallsPath = pathRegex.test(location.pathname);
isCallsPath?"":navegate("/home");
 




  
}

},[])

 

  return (
    <Routes>      
      <Route path='/' element={<Landing />} />
      <Route path='/login' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/tutor/:id' element={<Teach />} />
      <Route path='/calls/:id' element={<Calls />} />
      <Route path='*' element={<Error />} />
      {/* <PrivateRoute path="/home" component={<Home></Home>}  /> */}

    </Routes>
  )
}

export default App
