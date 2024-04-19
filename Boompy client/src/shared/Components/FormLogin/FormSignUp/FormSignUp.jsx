
import { FormLog,GoogleButton,Container,Span,Input,TextLogin,
    ContenedorRemember } from "../Form.style";
  import google from '../../../../../../imagenes/google.svg.svg'
const FormSignUp = () => {
    return (
      <FormLog style={{height:'600px'}}>
          <Container>
  
        <h2 style={{textAlign:'initial'}}>Create Your Account!</h2>
        <Span>
        Hey there! Ready to join the party? We just need a few details from you to get
started. Let's do this! 
        </Span>
        <br />
  
        {/* <GoogleButton>
         
          <img src={google} style={{width:'20px',margin:'10px'}} alt="imgGoogle" /><span>Continue with google</span>
        </GoogleButton> */}
  
      <div style={{display:'flex',justifyContent:'start'}}>
        <div style={{marginRight:'15px'}}>
        <TextLogin>First Name</TextLogin>
        <Input type="First Name"  placeholder="First Name" style={{marginBottom:'20px',paddingLeft:'20px',width:'180px'}}/>

        </div>
      <div>
      <TextLogin>Last Name</TextLogin>
      <Input type="Last Name"  placeholder="Last Name" style={{marginBottom:'20px',paddingLeft:'20px',width:'180px'}}/>

      </div>
      </div>
  
  
  
      <TextLogin>Email</TextLogin>
      <Input type="email"  placeholder="Email" style={{marginBottom:'20px',paddingLeft:'20px'}}/>
      <TextLogin>Password</TextLogin>
      <Input type="password" placeholder="Password" style={{marginBottom:'20px',paddingLeft:'20px'}}/>
      <TextLogin>Confirm Password</TextLogin>
      <Input type="password" placeholder=" Confirm Password" style={{marginBottom:'20px',paddingLeft:'20px'}}/>
      <ContenedorRemember>
      
  
      </ContenedorRemember>
      <GoogleButton style={{background:'#FFC224',border:'2px solid black',boxShadow: '2px 2px 2px',height:'35px',borderRadius:'20px'}}>
        Sign Up
      </GoogleButton>
        <div>
      <Span>Already have an account?</Span><a href="/" style={{margin:'4px'}}>Login</a>
  
        </div>
  
          </Container>
      </FormLog>
    );
  };
  
  export default FormSignUp;
  