import { Link } from "react-router-dom"
import {ContainerProfile,
    MainPhoto,
    ContenedorCard,
    ConteinerText
} from "./Cards.style"

import SmallImage from "./TinyImages/SmallImage"
import TutorCalendar from "../Calendar/Tutor_Calendar"


const CardProfile=({name,id,picture,price,goal,onMouseEnter,onMouseLeave,showTinyImg,photos}) => {

   
    return (
       <ContenedorCard >
        {showTinyImg&& <SmallImage photos={photos}></SmallImage>}
       
            <MainPhoto>
                <Link to={`/tutor/${id}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
              
                <img src={picture} alt="mainPhoto"  style={{width:'150px',height:'150px',borderRadius:'50%'}}/>
                </Link>
            
            </MainPhoto>
            
            <ConteinerText>
            <h3 style={{ fontWeight: '600',margin:'0'}}>{name}</h3>
            <span style={{color:'#390099',margin:'0',display:'block'}}>{goal}</span>
            {/* <span>🔥 200 Likes</span> */}
            <span style={{color:'#FFC224',fontWeight: '800'}}>${price}</span>
            <TutorCalendar pagina="Home" ID={id} tutor={name} />
            
            

            </ConteinerText>
           
            </ContenedorCard>
    ) 
}

export default CardProfile