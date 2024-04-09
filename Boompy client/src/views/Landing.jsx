
import React from "react"
import {Container,Headings,ContainerBar} from './Landing.style'
import NavBar from '../shared/NavBar/NavBar'
import Section from '../../../imagenes/Section.svg'
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

    </Container>
    
    
    )
}

export default Landing;