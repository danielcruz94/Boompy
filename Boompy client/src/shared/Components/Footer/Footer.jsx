import {Container,
    ContainerText,
    Columns,
    ContenedorImg,
    ContenedorStores,
    LinkFooter,
    TitleFooter
} from './Footer.style'






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
                    <a href="/"><img  src='../../../../public/imagenes/facebook.png' alt="Facebook" /></a>
                   <a href="/"> <img  src='../../../../public/imagenes/twitter.png' alt="Twitter" /></a>
                   <a href="/"> <img   src='../../../../public/imagenes/whattsapp.png' alt="Whatsapp" /></a>
                   <a href="/"> <img src='../../../../public/imagenes/instagram.png' alt="Instagram" /></a>
                    <a href="/"> <img   src='../../../../public/imagenes/youtube.png' alt="Youtube" /></a>
                    
                </ContenedorImg>
                <ContenedorStores>

                <img src='../../../../public/imagenes/apple.svg.png' style={{width:'100%'}} alt="AppleStore" />
                <img src='../../../../public/imagenes/googlePlay.svg.png' style={{width:'100%'}} alt="PlayStore" />

                </ContenedorStores>
                </Columns>
           

            </ContainerText>
        </Container>
    )
}

export default Footer;