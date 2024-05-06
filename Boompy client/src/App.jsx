// components

import './App.css'

//libraries

import { Routes, Route} from 'react-router-dom';
// components

import Login from "./views/Login";
import Home from "./views/Home"
import Landing from "./shared/Components/Landing/Landing";
import Error from "./views/Error/Error";
import Teach from './views/Teach/Teach';
import Calls from './views/Calls/Calls';
import Signup from "./views/SignUp/Signup";



function App() {
 

  return (
    <Routes>      
      <Route path='/' element={<Landing />} />
      <Route path='/login' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/tutors' element={<Teach />} />
      <Route path='/calls' element={<Calls />} />
      <Route path='*' element={<Error />} />
    </Routes>
  )
}

export default App
