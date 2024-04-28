// components
import Landing from "./views/Home"
import './App.css'
import Signup from "./views/SignUp/Signup";
//libraries

import { Routes, Route,useLocation,useNavigate} from 'react-router-dom';
import Login from "./views/Login";
import Home from "./views/Home"
//import Landing from "../src/views/Landing"

import Nav from "../src/shared/NavBar/NavBar";
//import Home from "./shared/Components/Home/Home";
//import Error from "./shared/Components/Error/Error";
import Footer from "./shared/Components/Footer/Footer"
import Teach from "./shared/Components/Teach/Teach"


function App() {
 

  return (
    <Routes>
    <Route path='/login' element={<Login></Login>}/>
    <Route path='/home' element={<Home></Home>}/>

    <Route path='/signup' element={<Signup></Signup>}/>
      

    </Routes>
  // // <Landing></Landing>
  // <div>
  //   <Nav/>
  //   <Teach/>
  //   <Footer/>
  // </div>
   
    
    
  )
}

export default App
