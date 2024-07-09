
import { FormLog,GoogleButton,Container,Span,Input,TextLogin,
    ContenedorRemember } from "../Form.style";
  import { useState } from "react";
  import axios from "axios";
  import { useSelector,useDispatch } from "react-redux"
  import Swal from 'sweetalert2';
  import 'sweetalert2/dist/sweetalert2.css';

const FormSignUp = () => {

  const [userCredentials, setUserCredentials] = useState({
    name: '',
    lastName:'',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordsUnMatch, setPasswordsUnMatch] = useState(false);
  const { name,lastName, email, password, confirmPassword } = userCredentials;
  const serverURL = useSelector(state => state.serverURL.url);

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordsUnMatch(true);
      return;
    } else if (passwordsUnMatch) {
      setPasswordsUnMatch(false);
    }

   

   
    const newUser=await axios.post(`${serverURL}/signup`,userCredentials)
    try {
      if(newUser){
        Swal.fire({
          icon: 'success',
          title: '¡Registro Exitoso!',
          text: 'Eres un nuevo usuario de la App de Torii.',
      }).then(() =>window.location.href = "/login" )
      }
    } catch (error) {
      console.log(error)
    }

    

    

   
   

    //

    // register({ name, email, password });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };




    return (
      <FormLog style={{ height: "600px" }}>
        <Container>
          <br />
          <h2 style={{ textAlign: "initial" }}>Create Your Account!</h2>
          <Span>
            Hey there! Ready to join the party? We just need a few details from
            you to get started. Let's do this!
          </Span>
          <br />

          {/* <GoogleButton>
         
          <img src='' style={{width:'20px',margin:'10px'}} alt="imgGoogle" /><span>Continue with google</span>
        </GoogleButton> */}

          <div style={{ display: "flex", justifyContent: "start" }}>
            <div style={{ marginRight: "15px" }}>
              <TextLogin>First Name</TextLogin>
              <Input
                type="First Name"
                name="name"
                placeholder="First Name"
                value={name}
                onChange={handleChange}

                style={{
                  marginBottom: "20px",
                  paddingLeft: "20px",
                  width: "100%",
                }}
              />
            </div>
            <div>
              <TextLogin>Last Name</TextLogin>
              <Input
                type="Last Name"
                placeholder="Last Name"
                name="lastName"
                value={lastName}
                onChange={handleChange}
                style={{
                  marginBottom: "20px",
                  paddingLeft: "20px",
                  width: "100%",
                }}
              />
            </div>
          </div>

          <TextLogin>Email</TextLogin>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={email.toLowerCase()}
            onChange={handleChange}
            style={{ marginBottom: "20px", paddingLeft: "20px" }}
          />
          <TextLogin>Password</TextLogin>
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            style={{ marginBottom: "20px", paddingLeft: "20px" }}
          />
          <TextLogin>Confirm Password</TextLogin>
          <Input
            type="password"
            placeholder=" Confirm Password"
            value={confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
            style={{ marginBottom: "20px", paddingLeft: "20px" }}
          />
          {passwordsUnMatch&&<p style={{color:'red'}}>Passwords do not match</p>}
          <ContenedorRemember></ContenedorRemember>
          <GoogleButton
           onClick={handleSubmit}
            style={{
              background: "#FFC224",
              border: "2px solid black",
              boxShadow: "2px 2px 2px",
              height: "35px",
              borderRadius: "20px",
            }}
          >
            Sign Up
          </GoogleButton>
          <div>
            <Span>Already have an account?</Span>
            <a href="/login" style={{ margin: "4px" }}>
              Login
            </a>
          </div>
        </Container>
      </FormLog>
    );
  };
  
  export default FormSignUp;
  