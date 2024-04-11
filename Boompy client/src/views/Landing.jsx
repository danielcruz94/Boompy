
import React from "react"
import {Container,Headings,ContainerBar} from './Landing.style'
import NavBar from '../shared/NavBar/NavBar'
import Section from '../../../imagenes/Section.svg'
import Form from '../shared/Components/FormLogin/Form'
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
    <h2>dhudhod</h2>
    



    </Container>
    
    
    )
}

export default Landing;