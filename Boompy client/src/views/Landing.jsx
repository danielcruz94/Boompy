
import React from "react"
import {Container,Headings,ContainerBar} from './Landing.style'
import NavBar from '../shared/NavBar/NavBar'
import Section from '../../../imagenes/Section.svg'
import Form from '../shared/Components/FormLogin/Form'
import Footer from "../shared/Components/Footer"

const Landing=() => {
    return (
   
    <Container>
    <Headings>
    </Headings>
    <NavBar>

    </NavBar>
    <ContainerBar>
        <img src={Section} alt="section" />
    </ContainerBar>
    <Form></Form>

    <br />
    <br />
    <br />
  <Footer>

  </Footer>
    
 



    </Container>
    
    
    )
}

export default Landing;