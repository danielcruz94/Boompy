import { Link } from "react-router-dom"
import SmallImage from "./TinyImages/SmallImage"
import TutorCalendar from "../Calendar/Tutor_Calendar"


const CardProfile=({name,id,picture,price,language,onMouseEnter,onMouseLeave,showTinyImg,photos}) => {

    function capitalizeFirstName(fullName) {       
        const names = fullName.trim().split(' ');   
        if (names.length === 0) {
          return '';
        }       
        let firstName = names[0];        
       
        if (firstName) {
          firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
        }        
        
        return firstName;
      }



    return (
       <div className="ContenedorCard" >
        {showTinyImg&& <SmallImage photos={photos}></SmallImage>}
       
            <div className="MainPhoto">
                <Link to={`/tutor/${id}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
              
                <img src={picture} alt="mainPhoto"/>
                </Link>
            
            </div>
            
            <div className="ConteinerText">
            <h3 >{capitalizeFirstName(name)}</h3>
            <p>{language}</p>
            {/* <span>🔥 200 Likes</span> */}
            <span >${price +" USD"}</span>
            <TutorCalendar pagina="Home" ID={id} tutor={name} amount={price} />
            
            

            </div>
           
            </div>
    ) 
}

export default CardProfile