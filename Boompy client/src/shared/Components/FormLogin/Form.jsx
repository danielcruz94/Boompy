import { FormLog,GoogleButton,Container,Span,Input,TextLogin } from "./Form.style";
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

    



    <TextLogin>Email</TextLogin>
    <Input type="email"  placeholder="Email" style={{marginBottom:'20px',paddingLeft:'20px'}}/>
    <TextLogin>Password</TextLogin>
    <Input type="password" placeholder="Password" style={{marginBottom:'20px',paddingLeft:'20px'}}/>
    <div>
    <input type="checkbox" />
    <Span>Remember me</Span>
    <a href="">Forgot Password</a>

    </div>
    <GoogleButton style={{background:'#FFC224',border:'2px solid black',boxShadow: '2px 2px 2px',height:'35px',borderRadius:'20|px'}}>
      Sign In
    </GoogleButton>
      <div>
    <Span>Do not have an account?</Span><a href="">Sign Up</a>

      </div>

        </Container>
    </FormLog>
  );
};

export default Form;
