
import React from "react"
import {Container,Headings,ContainerPicture} from './Landing.style'
import NavBar from '../shared/NavBar/NavBar'
import Section from '../../../imagenes/Section.svg'
import Form from '../shared/Components/FormLogin/Form'
import Footer from '../shared/Components/Footer/Footer'

const Login=() => {
    return (
   
    <Container>
    <Headings>
    </Headings>
    {/* <NavBar>

    </NavBar> */}
    <ContainerPicture>
        <img src={Section} style={{width:'100%',height:'100%',objectFit:'cover'}} alt="section" />
    </ContainerPicture>
    <Form></Form>

    <br />
    <br />
    <br />
  <Footer>

  </Footer>
    
 



    </Container>
    
    
    )
}

export default Login;