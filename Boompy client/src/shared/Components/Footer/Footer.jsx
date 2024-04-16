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
                
                    <li>Become a Student</li>
                    <li>Our partners</li>
                    <li>Become a partner</li>
               
                </Columns>
                <Columns>
                <h4>Our Company</h4>
               
              
                    <li>Become a Boomper</li>
                    <li>Contact us</li>
                    <li>Events</li>
               
                </Columns>
                <Columns>
                <h4>Get in Tocuh</h4>
                <ContenedorImg>
                    <img src={Facebook} alt="Facebook" />
                    <img src={Twitter} alt="Twitter" />
                    <img src={Whattsapp} alt="Whatsapp" />
                    <img src={Instagram} alt="Instagram" />
                    <img src={Youtube} alt="Youtube" />
                    
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