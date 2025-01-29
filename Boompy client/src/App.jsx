import './App.css'

// Libraries
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Login from "./views/Login";
import Home from "./views/Home";
import Landing from "./shared/Components/Landing/Landing";
import Instagram from "./shared/Components/Instagram/instagram";
import PrivacyPolicy from "./shared/Components/politicas/PrivacyPolicy";
import TermsService from "./shared/Components/politicas/TermsService";
import Deleteimg from "./shared/Components/politicas/delete";
import Error from "./views/Error/Error";
import Teach from './views/Teach/Teach';
import Calls from './views/Calls/Calls';
import Signup from "./views/SignUp/Signup";
import { useDispatch } from 'react-redux';
import { useEffect, React, useState } from "react";
import { loadUser } from "./Redux/authSlice";

function App() {
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la verificación
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const storedString = localStorage.getItem('userData');
    const isUserLoggedIn = storedString !== null;

    if (isUserLoggedIn) {
      const userObject = JSON.parse(storedString);
      dispatch(loadUser(userObject));

      // Si el usuario está autenticado, redirigir a /home si intenta acceder a /login o /signup
      if (location.pathname === '/login' || location.pathname === '/signup') {
        navigate('/home');
      }
    } else {
      // Si no hay datos de usuario, redirigir a la página Landing si intenta acceder a cualquier otra página
      if (location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/signup') {
        navigate('/');
      }
    }

    // Una vez verificado todo, se establece el estado isLoading a false
    setIsLoading(false);
  }, [location, dispatch, navigate]);

  if (isLoading) {
    // Mientras se verifica, puedes mostrar un componente de carga o nada
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/home' element={<Home />} />
      <Route path='/instagram' element={<Instagram />} />
      <Route path='/instagram/:code' element={<Instagram />} />
      <Route path='/privacy' element={<PrivacyPolicy />} />
      <Route path='/service' element={<TermsService />} />
      <Route path='/delete' element={<Deleteimg />} />
      <Route path='/tutor/:id' element={<Teach />} />
      <Route path='/calls/:id' element={<Calls />} />
      <Route path='*' element={<Error />} />
    </Routes>
  );
}

export default App;
