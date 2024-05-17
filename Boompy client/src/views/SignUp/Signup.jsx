
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
        <NavBar textBotton={"Login"}>
    
        </NavBar>
        <ContainerTitle>
            <img src={Section} alt="section" />
            <h3 style={{fontSize:'30px',position:'relative',top:'-200px',left:'-400px'}}>Student SingUp</h3>
        </ContainerTitle>
        <br />
        <br />
        <br />
        
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