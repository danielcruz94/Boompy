// components
import Landing from "../src/views/Landing"
import './App.css'
import Signup from "./views/SignUp/Signup";
//libraries

import { Routes, Route,useLocation,useNavigate} from 'react-router-dom';
import Login from "./views/Login";


function App() {
 

  return (
    <Routes>
    <Route path='/login' element={<Login></Login>}/>

    <Route path='/signup' element={<Signup></Signup>}/>
      

    </Routes>
    
    
  )
}

export default App
