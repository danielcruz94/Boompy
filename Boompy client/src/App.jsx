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
    <Route path='/' element={<Landing></Landing>}/>
    <Route path='/landing' element={<Landing></Landing>}/>

    <Route path='/login' element={<Login></Login>}/>
    <Route path='/home' element={<Home></Home>}/>    
    <Route path='/signup' element={<Signup></Signup>}/>
    <Route path='*' element={<Error></Error>}/>
    <Route path='/tutors' element={<Teach></Teach>}/>
    <Route path='/calls' element={<Calls></Calls>}/>

    </Routes>
    
  )
}

export default App
