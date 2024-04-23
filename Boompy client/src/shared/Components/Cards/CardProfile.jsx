import User from "../../../../../imagenes/Perfiles/_RHM6393.jpg"
import {ContainerProfile,
    MainPhoto,
    ContenedorCard
} from "./Cards.style"
const CardProfile=() => {
    return (
       <ContenedorCard >
            <MainPhoto>
            <img src={User} alt="mainPhoto"  style={{width:'150px',height:'150px',borderRadius:'50%'}}/>
            </MainPhoto>
            
            <div style={{marginTop:'30px',display:'flex',flexDirection:'column',alignItems:'start',marginLeft:'10px'}}>
            <h3 style={{ fontWeight: '600',margin:'0'}}>Mark Jukarberg</h3>
            <span style={{color:'#390099',margin:'0',display:'block'}}>Spanish</span>
            <span>🔥 200 Likes</span>
            <span style={{color:'#FFC224',fontWeight: '800'}}>$5</span>
            <a>Book a Ticket ✈️ </a>

            </div>
           
            </ContenedorCard>
    ) 
}

export default CardProfile