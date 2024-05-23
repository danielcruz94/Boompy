import {Container,
    ContainerText,
    Columns,
    ContenedorImg,
    ContenedorStores,
    LinkFooter,
    TitleFooter
} from './Footer.style'

import Facebook  from '../../../../../imagenes/facebook.png'
import Twitter  from '../../../../../imagenes/twitter.png'
import Whattsapp  from '../../../../../imagenes/whattsapp.png'
import Instagram  from '../../../../../imagenes/instagram.png'
import Youtube  from '../../../../../imagenes/youtube.png'
import AppleStore  from '../../../../../imagenes/apple.svg.png'
import PlayStore from '../../../../../imagenes/googlePlay.svg.png'



const Footer=() => {
    return (
        <Container>
            <ContainerText>
                <Columns>
                <TitleFooter>Torii</TitleFooter>
              
                    <LinkFooter>Medellín Colombia</LinkFooter>
                    <LinkFooter>Carrera 81 #45-31</LinkFooter>
               
                </Columns>
                <Columns>

                <TitleFooter>Usefull Link</TitleFooter>
                
                  <a href="/">  <LinkFooter>Become a Student</LinkFooter></a>
                    <a href="/"><LinkFooter>Our partners</LinkFooter></a>
                   <a href="/"> <LinkFooter>Become a partner</LinkFooter></a>
               
                </Columns>
                <Columns>
                <TitleFooter>Our Company</TitleFooter>
               
              
                    <a href="/"><LinkFooter>Become a Torii</LinkFooter></a>
                   <a href="/"> <LinkFooter>Contact us</LinkFooter></a>
                   <a href="/"> <LinkFooter>Events</LinkFooter></a>
               
                </Columns>
                <Columns>
                <TitleFooter>Get in Touch</TitleFooter>
                <ContenedorImg>
                    <a href="/"><img  src={Facebook} alt="Facebook" /></a>
                   <a href="/"> <img  src={Twitter} alt="Twitter" /></a>
                   <a href="/"> <img   src={Whattsapp} alt="Whatsapp" /></a>
                   <a href="/"> <img src={Instagram} alt="Instagram" /></a>
                    <a href="/"> <img   src={Youtube} alt="Youtube" /></a>
                    
                </ContenedorImg>
                <ContenedorStores>

                <img src={AppleStore} style={{width:'100%'}} alt="AppleStore" />
                <img src={PlayStore} style={{width:'100%'}} alt="PlayStore" />

                </ContenedorStores>
                </Columns>
           

            </ContainerText>
        </Container>
    )
}

export default Footer;