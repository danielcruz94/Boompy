import {Container,
    ContainerText,
    Columns,
    ContenedorImg,
    Span,
    LinkFooter,
    
} from './Footer.style'

import Facebook  from '../../../assets/facebook.png'
import Twitter  from '../../../assets/twitter.png'
import Whattsapp  from '../../../assets/whattsapp.png'
import Instagram  from '../../../assets/instagram.png'
import Youtube  from '../../../assets/youtube.png'



const Footer=() => {
    return (
        <Container>
            <ContainerText>
                
              
                <Columns>
                
               
              
                    <b><a href="/"><LinkFooter>Become a Torii</LinkFooter></a></b>
                   <a href="mailto:info@torriapp.com"> <LinkFooter>Contact us: manage@toriiapp.com</LinkFooter></a>
                   
                   <a href="/"> <LinkFooter>Términos de uso</LinkFooter></a>
                   <a href="/"> <LinkFooter>Política de privacidad</LinkFooter></a>
               
                </Columns>
                <Columns>
                
                <ContenedorImg>
                    <a href="/"><img  src={Facebook} alt="Facebook" /></a>
                   <a href="/"> <img  src={Twitter} alt="Twitter" /></a>
                   <a href="/"> <img   src={Whattsapp} alt="Whatsapp" /></a>
                   <a href="/"> <img src={Instagram} alt="Instagram" /></a>
                    <a href="/"> <img   src={Youtube} alt="Youtube" /></a>
                    
                </ContenedorImg>
                <Span style={{color:'white'}}>&copy; 2024 Torii. Todos los derechos reservados.</Span>
               
                
                </Columns>
                
           

            </ContainerText>
        </Container>
    )
}

export default Footer;