// components
import Landing from "./views/Home"
import './App.css'
import Signup from "./views/SignUp/Signup";
//libraries

<<<<<<< HEAD
import { Routes, Route,useLocation,useNavigate} from 'react-router-dom';
import Login from "./views/Login";
import Home from "./views/Home"

=======
import Landing from "../src/views/Landing"
import './App.css'
>>>>>>> 95af5b1a1138b77676d671a260bf1fbf7573c206

function App() {
 

  return (
<<<<<<< HEAD
    <Routes>
    <Route path='/login' element={<Login></Login>}/>
    <Route path='/home' element={<Home></Home>}/>

    <Route path='/signup' element={<Signup></Signup>}/>
      

    </Routes>
=======
   <Landing></Landing>
>>>>>>> 95af5b1a1138b77676d671a260bf1fbf7573c206
    
    
  )
}

export default App
