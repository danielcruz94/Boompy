import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { login } from '../../../Redux/authSlice';
import './login.css';

const Form = () => {
  const auth = useSelector((state) => state.auth);
  const serverURL = useSelector(state => state.serverURL.url);

  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email, password } = userCredentials;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin(event); // Call handleLogin on Enter key press
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userLogin = await axios.post(
        `${serverURL}/login`,
        userCredentials
      );

      const stringifiedUserData = JSON.stringify(userLogin.data);
      window.localStorage.setItem('userData', stringifiedUserData);
      setUserCredentials({ email: "", password: "" });
      setErrorMessage("");
      dispatch(login(userLogin.data));
      navigate("/home");
    } catch (error) {
      console.log(error);
      setErrorMessage("¡Ups! Los datos ingresados no coinciden con nuestros registros.");
    }
  };

  return (
    <form className="form-log">
      <div className="container_login">
        <br />
        <h2>¡Bienvenido de nuevo!</h2>
        <span className="span">
        ¡Hola! <strong>¿Listo para iniciar sesión? </strong>
        Simplemente <strong>ingrese su nombre de usuario y contraseña </strong> a 
        continuación y volverá a la acción en poco tiempo.
        </span>
       

        <p className="text-login">Correo electronico</p>
        <input
          className="input"
          type="email"         
          name="email"
          value={email}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <p className="text-login">Contraseña</p>
        <input
          className="input"
          type="password"          
          name="password"
          value={password}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <div className="conten_password">
         
          <a href="#" className="blue">Olvide mi contraseña</a>
        </div>

        <div className="conten_login_button">
            <button
              className="login-button"
              onClick={handleLogin}         
            >
              Iniciar mi Torii
            </button>

            <button className="login-button">
            <span>Iniciar con  <i className="material-icons">G</i></span>
            </button>
        </div>

        <div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {/*<span>Do not have an account?</span><a href="/signup" style={{ margin: '4px' }}>Sign Up</a>*/}
        </div>
      </div>
    </form>
  );
};

export default Form;
