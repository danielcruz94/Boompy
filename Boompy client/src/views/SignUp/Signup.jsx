
import React from "react"
import {Container,
  Headings,
  ContainerTitle} from '../Landing.style'

import Footer from '../../shared/Components/Footer/Footer'
import FormSignUp from "../../shared/Components/FormLogin/FormSignUp/FormSignUp"

import Section from '../../assets/Section.svg'

const  Signup=() => {



    return (
        <Container>
        <Headings>
        </Headings>
        
        <ContainerTitle>
            <img src={Section} style={{width:'100%',height:'100%',objectFit:'cover'}}  alt="section" />
          
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