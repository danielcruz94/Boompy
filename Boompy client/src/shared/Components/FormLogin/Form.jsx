import { FormLog,GoogleButton,Container,Span,Input,TextLogin,
  ContenedorRemember } from "./Form.style";
import google from '../../../../../imagenes/google.svg.svg'
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const Form = () => {

  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  
  });

  const [user,setUser]=useState('');

  const [errorMessage,setErrorMessage]=useState('')


  const { email, password} = userCredentials;


useEffect(()=>{
 const loggedUserJSON=window.localStorage.getItem('loggedAppUser')
 if(loggedUserJSON){
  const user=JSON.parse(loggedUserJSON);
  setUser(user)
 }
},[])


  



  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleLogin = async(e) => {
    e.preventDefault();

    try {
      const userLogin=await axios.post('http://localhost:3001/api/login',userCredentials)
   
   localStorage.setItem('loggedAppUser', JSON.stringify(userLogin.data));
   if(user===''){
    setErrorMessage(userLogin.data.error)
   }else{
        setUser(userLogin.data)
        
      setUserCredentials({email:'',password:''})
      window.location.href = "/home";
      
   }
    
    } catch (error) {
      setErrorMessage(error)
    }


  }

  const handleLogout=() => {
    setUser(null);

     
  }
  

  return (
    <FormLog>
        <Container>
      <br />
      <h2 style={{textAlign:'initial'}}>Welcome back!</h2>
      <Span>
        Hey there! Ready to log in? Just enter your username and password below
        and you'll be back in action in no time. 
      </Span>

      <GoogleButton>
       
        <img src={google} style={{width:'20px',margin:'10px'}} alt="imgGoogle" /><span>Continue with google</span>
      </GoogleButton>

    



    <TextLogin>Email</TextLogin>
    <Input type="email"  placeholder="Email"  name="email" value={email} onChange={handleChange} style={{marginBottom:'20px',paddingLeft:'20px'}}/>
    <TextLogin>Password</TextLogin>
    <Input type="password" placeholder="Password" name="password" value={password} onChange={handleChange}  style={{marginBottom:'20px',paddingLeft:'20px'}}/>
    <ContenedorRemember>
      <div>

    <input type="checkbox" />
    <Span>Remember me</Span>

      </div>
    <a href="">Forgot Password</a>

    </ContenedorRemember>
    <GoogleButton  onClick={handleLogin}style={{background:'#FFC224',border:'2px solid black',boxShadow: '2px 2px 2px',height:'35px',borderRadius:'20px'}}>
      Sign In
    </GoogleButton>
      <div>

        {errorMessage&&<p style={{color:'red'}}>{errorMessage}</p>}
    <Span>Do not have an account?</Span><a href="/signup" style={{margin:'4px'}}>Sign Up</a>

      </div>

        </Container>
    </FormLog>
  );
};

export default Form;
