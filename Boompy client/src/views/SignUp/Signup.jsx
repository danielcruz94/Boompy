
import FormSignUp from "../../shared/Components/FormLogin/FormSignUp/FormSignUp"
import { Link } from 'react-router-dom';



const Login=() => {
    return (
   
      <div className="container-login">
        <img src="/login/logo.png" alt="TORII" className="form_logo" />
        <img src="/login/pqrs.png" alt="TORII" className="form_pqrs" />    
         
        <FormSignUp></FormSignUp>

   
      <a href="/login" >
      <img src="/login/Vector 2.png" alt="TORII" className="form_vector" />
      </a>
    

     <p className='Tex_condiciones'>© 2024 Torii. All rights reserved | <Link to="/service">Terminos y Condiciones</Link> | <Link to="/privacy">Politica de privacidad de datos</Link></p>    
      </div>
    

   
   

    
 



    
    
    )
}

export default Login;