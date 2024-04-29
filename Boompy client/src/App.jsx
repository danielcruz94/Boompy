// components

import './App.css'
import Signup from "./views/SignUp/Signup";
//libraries

import { Routes, Route,useLocation,useNavigate} from 'react-router-dom';
import Login from "./views/Login";
import Home from "./views/Home"


import Landing from "./shared/Components/Landing/Landing";
import Error from "./views/Error/Error";
import Teach from './views/Teach/Teach';



function App() {
 

  return (
    <Routes>
    <Route path='/login' element={<Login></Login>}/>
    <Route path='/home' element={<Home></Home>}/>
    <Route path='/landing' element={<Landing></Landing>}/>
    <Route path='/signup' element={<Signup></Signup>}/>
    <Route path='/error' element={<Error></Error>}/>
    <Route path='/tutors' element={<Teach></Teach>}/>

    </Routes>

  // <div>
  //   <Nav/>
  //   <Teach/>
  //   <Footer/>
  // </div>
   
    
    
  )
}

export default App
