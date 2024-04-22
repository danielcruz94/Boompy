// components
import Landing from "./views/Home"
import './App.css'
import Signup from "./views/SignUp/Signup";
//libraries

import { Routes, Route,useLocation,useNavigate} from 'react-router-dom';
import Login from "./views/Login";
import Home from "./views/Home"


function App() {
 

  return (
    <Routes>
    <Route path='/login' element={<Login></Login>}/>
    <Route path='/home' element={<Home></Home>}/>

    <Route path='/signup' element={<Signup></Signup>}/>
      

    </Routes>
    
    
  )
}

export default App
