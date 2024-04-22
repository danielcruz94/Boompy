
import React from "react"
import {Container,Headings,ContainerTitle} from './Landing.style'
import {ContainerProfile} from '../shared/Components/Cards/Cards.style'
import NavBar from '../shared/NavBar/NavBar'
import Section from '../../../imagenes/Section.svg'
import Form from '../shared/Components/FormLogin/Form'
import Footer from '../shared/Components/Footer/Footer'
import CardProfile from "../shared/Components/Cards/CardProfile"

const Home=() => {
    return (
   
    <Container>
    <Headings>
    </Headings>
    <NavBar>

    </NavBar>
    <ContainerTitle>
            <img src={Section}  style={{width:'100%'}}alt="section" />
            <h3 style={{fontSize:'30px',position:'relative',top:'-200px',left:'-400px'}}>Choose your Trip</h3>
        </ContainerTitle>
    <ContainerProfile>
    <CardProfile></CardProfile>
    <CardProfile></CardProfile>
    <CardProfile></CardProfile>
    <CardProfile></CardProfile>
    <CardProfile></CardProfile>
    <CardProfile></CardProfile>
    <CardProfile></CardProfile>
    <CardProfile></CardProfile>
    
    
    
    </ContainerProfile>

    <br />
    <br />
    <br />
  <Footer>

  </Footer>
    
 



    </Container>
    
    
    )
}

export default Home;