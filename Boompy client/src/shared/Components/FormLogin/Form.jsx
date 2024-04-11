import { FormLog,GoogleButton,Container,Span,Input } from "./Form.style";
import google from '../../../../../imagenes/google.svg.svg'
const Form = () => {
  return (
    <FormLog>
        <Container>

      <h2 style={{textAlign:'initial'}}>Welcome back!</h2>
      <Span>
        Hey there! Ready to log in? Just enter your username and password below
        and you'll be back in action in no time. 
      </Span>

      <GoogleButton>
       
        <img src={google} style={{width:'20px',margin:'10px'}} alt="imgGoogle" /><span>Continue with google</span>
      </GoogleButton>


    <p>Email</p>
    <Input type="text"  placeholder="Email"/>
    <p>Password</p>
    <Input type="password" placeholder="Password"/>

        </Container>
    </FormLog>
  );
};

export default Form;
