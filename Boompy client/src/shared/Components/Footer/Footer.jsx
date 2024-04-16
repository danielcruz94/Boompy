import {Container,
    ContainerText,
    Columns,
    ContenedorImg,
    ContenedorStores
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
                <h4>Boompy</h4>
              
                    <li>Medellín Colombia</li>
                    <li>Carrera 81 #45-31</li>
               
                </Columns>
                <Columns>

                <h4>Usefull Link</h4>
                
                  <a href="/">  <li>Become a Student</li></a>
                    <a href="/"><li>Our partners</li></a>
                   <a href="/"> <li>Become a partner</li></a>
               
                </Columns>
                <Columns>
                <h4>Our Company</h4>
               
              
                    <a href="/"><li>Become a Boomper</li></a>
                   <a href="/"> <li>Contact us</li></a>
                   <a href="/"> <li>Events</li></a>
               
                </Columns>
                <Columns>
                <h4>Get in Tocuh</h4>
                <ContenedorImg>
                    <a href="/"><img src={Facebook} alt="Facebook" /></a>
                   <a href="/"> <img src={Twitter} alt="Twitter" /></a>
                   <a href="/"> <img src={Whattsapp} alt="Whatsapp" /></a>
                   <a href="/"> <img src={Instagram} alt="Instagram" /></a>
                    <a href="/"> <img src={Youtube} alt="Youtube" /></a>
                    
                </ContenedorImg>
                <ContenedorStores>

                <img src={AppleStore} alt="AppleStore" />
                <img src={PlayStore} alt="PlayStore" />

                </ContenedorStores>
                </Columns>
           

            </ContainerText>
        </Container>
    )
}

export default Footer;