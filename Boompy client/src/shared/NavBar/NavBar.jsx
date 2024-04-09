
import {ContainerBar,
    ContainerNavBar,
    Image,
    SubHeading,
    SubmitButton
    } from '../../views/Landing.style'
import Vector from '../../../../imagenes/Vector.svg'
import Header from'../../../../imagenes/Header.svg'
const NavBar=() => {
    return (
        
            <ContainerBar >
                <Image>
                <img src={Header} style={{width:'60px'}} alt="logo" />
                </Image>
                <div style={{display:'flex'}}>
                <SubHeading>Home</SubHeading>
                <SubHeading>Lenguages</SubHeading>
                <SubHeading>Calendar</SubHeading>

                </div>

                
                <ContainerNavBar>
                <img src={Vector} alt="vector" />
                <p style={{marginLeft:'6px'}}>Categories</p>
                <SubmitButton placeholder="Search your partner" ></SubmitButton>
                </ContainerNavBar>

                
               

              

               
            </ContainerBar>
       
    )
}


export default NavBar