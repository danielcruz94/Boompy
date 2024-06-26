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
      <Route path='/tutor/:id' element={<Teach />} />
      <Route path='/calls/:id' element={<Calls />} />
      <Route path='*' element={<Error />} />
      {/* <PrivateRoute path="/home" component={<Home></Home>}  /> */}

    </Routes>
  )
}

export default App
