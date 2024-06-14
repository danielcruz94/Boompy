
import React from "react"
import {Container,Headings,ContainerTitle} from '../Landing.style'
import NavBar from '../../shared/NavBar/NavBar'

import Footer from '../../shared/Components/Footer/Footer'
import FormSignUp from "../../shared/Components/FormLogin/FormSignUp/FormSignUp"
const  Signup=() => {



    return (
        <Container>
        <Headings>
        </Headings>
        {/* <NavBar textBotton={"Login"}>
    
        </NavBar> */}
        <ContainerTitle>
            <img src='../../../public/imagenes/Section.svg' style={{width:'100%',height:'100%',objectFit:'cover'}}  alt="section" />
          
        </ContainerTitle>
          <h3 >Student SingUp</h3>
        <br />
        <br />
        
        
       <FormSignUp></FormSignUp>
        <br />
        <br />
        <br />
      <Footer/>
    
 
        
     
    
    
    
        </Container>
        
    )
}

export default Signup;