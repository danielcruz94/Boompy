// components

import './App.css'
import Signup from "./views/SignUp/Signup";
//libraries

import { Routes, Route,useLocation,useNavigate} from 'react-router-dom';
import Login from "./views/Login";
import Home from "./views/Home"


import Nav from "../src/shared/NavBar/NavBar";
import Landing from "./shared/Components/Landing/Landing";
//import Error from "./shared/Components/Error/Error";
import Footer from "./shared/Components/Footer/Footer"
import Teach from "./shared/Components/Teach/Teach"


function App() {
 

  return (
    <Routes>
    <Route path='/login' element={<Login></Login>}/>
    <Route path='/home' element={<Home></Home>}/>
    <Route path='/landing' element={<Landing></Landing>}/>
    <Route path='/signup' element={<Signup></Signup>}/>
      

    </Routes>

  // <div>
  //   <Nav/>
  //   <Teach/>
  //   <Footer/>
  // </div>
   
    
    
  )
}

export default App
