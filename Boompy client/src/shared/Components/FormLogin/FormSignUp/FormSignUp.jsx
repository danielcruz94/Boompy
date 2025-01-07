import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { Link } from "react-router-dom";

const FormSignUp = () => {
  const [userCredentials, setUserCredentials] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordsUnMatch, setPasswordsUnMatch] = useState(false);
  const { name, lastName, email, password, confirmPassword } = userCredentials;
  const serverURL = useSelector((state) => state.serverURL.url);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordsUnMatch(true);
      return;
    } else if (passwordsUnMatch) {
      setPasswordsUnMatch(false);
    }

    const newUser = await axios.post(`${serverURL}/signup`, userCredentials);
    try {
      if (newUser) {
        Swal.fire({
          icon: "success",
          title: "¡Registro exitoso!",
          text: "Bienvenido a la aplicación Torii.",
        }).then(() => (window.location.href = "/login"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="form-log form-registro">
      <div>
        <br />
        <h2>Crea tu Torii aquí</h2>
        <span className="span_registro">
        ¡Hola! <strong>¿Listo para unirse a la fiesta? </strong> 
        Solo necesitamos algunos detalles de usted para comenzar. 
        <strong> ¡Hagamos esto!</strong>
        </span>
        <br />

        <div className="cont_name">
          <div>
            <p>Nombre</p>
            <input
              type="text"
              name="name"             
              value={name}
              onChange={handleChange}
            />
          </div>
          <div>
            <p>Apellido</p>
            <input
              type="text"
              name="lastName"             
              value={lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <p>Correo electronico</p>
        <input
          type="email"
          name="email"         
          value={email.toLowerCase()}
          onChange={handleChange}
        />

        <p>Contraseña</p>
        <input
          type="password"
          name="password"         
          value={password}
          onChange={handleChange}
        />

        <p>Confirmar contraseña</p>
        <input
          type="password"
          name="confirmPassword"         
          value={confirmPassword}
          onChange={handleChange}
        />

        {passwordsUnMatch && <p style={{ color: "red" }}>Passwords do not match</p>}

        <div className="registro-button">
          <button type="submit" className="login-button">Unirme a &nbsp;<strong> Torii</strong></button>
        </div>      
        
      </div>
    </form>
  );
};

export default FormSignUp;
