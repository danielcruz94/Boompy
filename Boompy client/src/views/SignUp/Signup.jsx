
import React from "react"
import {Container,Headings,ContainerTitle} from '../Landing.style'
import NavBar from '../../shared/NavBar/NavBar'
import Section from '../../../../imagenes/Section.svg'
import Footer from '../../shared/Components/Footer/Footer'
import FormSignUp from "../../shared/Components/FormLogin/FormSignUp/FormSignUp"
const  Signup=() => {



    return (
        <Container>
        <Headings>
        </Headings>
        <NavBar>
    
        </NavBar>
        <ContainerTitle>
            <img src={Section}  style={{width:'100%'}}alt="section" />
            <h3 style={{fontSize:'20px',position:'relative',top:'-200px',left:'-400px'}}>Student SingUp</h3>
        </ContainerTitle>
        
       <FormSignUp></FormSignUp>
        <br />
        <br />
        <br />
      <Footer>
    
      </Footer>
        
     
    
    
    
        </Container>
        
    )
}

export default Signup;