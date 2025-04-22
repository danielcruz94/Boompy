import Form from '../shared/Components/FormLogin/Form'
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import Spinner from "../../src/shared/Components/Modals/Spinners/Spinner";
import { Helmet } from 'react-helmet';

const Login = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = "/login/fondo.png";
    img.onload = () => setIsLoading(false);
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <Helmet>
        <link rel="preload" href="/login/fondo.png" as="image" />
      
      </Helmet>

      <div className="container-login">
        <img src="/login/fondo.png" alt="fondo" className="hidden" />
        <img src="/login/logo.png" alt="TORII" className="form_logo" />
        <img src="/login/pqrs.png" alt="TORII" className="form_pqrs" />    
        <Form />
        <a href="/signup">
          <img src="/login/Vector 1.png" alt="TORII" className="form_vector" />
        </a>
        <p className='Tex_condiciones color'>
          © 2024 Torii. All rights reserved | 
          <Link to="/service">Términos y Condiciones</Link> | 
          <Link to="/privacy">Política de privacidad de datos</Link>
        </p>    
      </div>
    </>
  );
}

export default Login;
