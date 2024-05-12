import { Link } from "react-router-dom"
import {ContainerProfile,
    MainPhoto,
    ContenedorCard
} from "./Cards.style"


const CardProfile=({name,id,picture,price,goal}) => {
    return (
       <ContenedorCard >
            <MainPhoto>
                <Link to={`/tutor/${id}`}>
                <img src={picture} alt="mainPhoto"  style={{width:'150px',height:'150px',borderRadius:'50%'}}/>
                </Link>
            
            </MainPhoto>
            
            <div style={{marginTop:'30px',display:'flex',flexDirection:'column',alignItems:'start',marginLeft:'10px'}}>
            <h3 style={{ fontWeight: '600',margin:'0'}}>{name}</h3>
            <span style={{color:'#390099',margin:'0',display:'block'}}>{goal}</span>
            <span>🔥 200 Likes</span>
            <span style={{color:'#FFC224',fontWeight: '800'}}>${price}</span>
            <a>Book a Ticket ✈️ </a>
            

            </div>
           
            </ContenedorCard>
    ) 
}

export default CardProfile