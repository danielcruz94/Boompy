import React from 'react';
import Footer from '../../shared/Components/Footer/Footer';
import './Teach.css'; // Importa el archivo CSS personalizado
import {Headings} from '../Landing.style'
import NavBar from '../../shared/NavBar/NavBar';
import { useParams } from "react-router-dom";
import axios from 'axios'
import { useNavigate} from 'react-router-dom';
import { useSelector,useDispatch } from "react-redux"
import ImageFileUpload from '../../shared/Components/ImageUpload/ImageFileUpdload'



import TutorCalendar from '../../shared/Components/Calendar/Tutor_Calendar';



const Teach = () => {
  const auth = useSelector((state) => state.auth);
  console.log(auth)
  const navegate = useNavigate();

    const imageUrls = [
        'https://scontent.feoh6-1.fna.fbcdn.net/v/t39.30808-6/419700480_7224997534190008_6658269914087985451_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEuYqUJkfSv79EjmsmhxKEYCCX-a4SkTqcIJf5rhKROp_bCr0B97XCyNsMfFXU6n-8&_nc_ohc=2tEZW9EI_IsQ7kNvgEjGJKW&_nc_ht=scontent.feoh6-1.fna&oh=00_AYAHcL7uR6pHhnK5jm82UXijZ9zsVyVSooby_SJcifMNbw&oe=6651187E',
        'https://scontent.feoh6-1.fna.fbcdn.net/v/t39.30808-6/340922658_782923856506944_5114343893270765975_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEL7cqtTms5SFEpOGMuGO21LKN24vqSILQso3bi-pIgtISf_5vgp1J3xBMRSXW_YgI&_nc_ohc=c1D_5gGxEdoQ7kNvgGvVkrS&_nc_ht=scontent.feoh6-1.fna&oh=00_AYC-gKt13GeXKcS_iNPN2oDrawZtaKBuFD50jKflx5KE9Q&oe=66513782',
        'https://scontent.feoh6-1.fna.fbcdn.net/v/t39.30808-6/271215180_4825544210802031_1696546280028109373_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEEOcOhKsPglGbDNtgPScjcKbEfrvhKPj8psR-u-Eo-P0hKoQb7KK46PhSc9jUNlX0&_nc_ohc=B51CB1ah9l8Q7kNvgHPhHTQ&_nc_ht=scontent.feoh6-1.fna&oh=00_AYCkD4Ac38tDLGx4ddut9_MzHTX6AtPyurNZiwQQPkNlgw&oe=66513047',
       
    ];

    const [tutor,setTutor]=React.useState({})
    const params =useParams()

React.useEffect(()=>{
    axios(`http://localhost:3001/api/user/${params.id}`)
    .then(({ data }) => {
       
        if (data.name) {
           
            setTutor(data)
        } else {
           window.alert('¡No hay personajes con este ID!');
        }
     })
     .catch(()=>{
      alert("se rompio")
     })
     return setTutor({})
   },[params?.id])

   const handleLogout = () => {
    window.localStorage.removeItem("userData");
    navegate("/");
  };




    
    return (

      <div className="contenTeach">
        <Headings></Headings>
        <NavBar  
        textBotton={"Logout"}
        onClick={handleLogout}></NavBar>
        <div className="NavTeach">
         
        </div>

        <div className="InfTeach">
          <div>
            <div className="profile-container">
              <div className="profile-picture">
              
              <ImageFileUpload
                   id="profile_image"
                   text="Profile Photo"
                   accept="image/png,image/jpeg"
                   name="profile_image"
                   picture={tutor.picture}
                   className="rounded-circle"
                   onChange={(fileUrl) =>
                    setsettingInformation({ ...settingInformation, picture: fileUrl })
                   }
                   />
                <img
                  src={tutor.picture}
                  alt="Foto de perfil"
                  className="rounded-circle"
                />
              </div>
              <div className="profile-info">
                <h2>
                  {tutor.name} {tutor.lastName} 
                </h2>

                <p>📍 Uruguay</p>

                <p style={{marginLeft:'20px'}}> Hobbies </p>
                <div className="social-icons">
                  <div className="social-icon-wrapper">
                   <a href="#" className='iconos'>✈️</a>
                  </div>
                  <div className="social-icon-wrapper">
                  <a href="#" className='iconos'>🥎</a>
                  </div>
                  <div className="social-icon-wrapper">
                  <a href="#" className='iconos'>🧠</a>
                  </div>

                

                </div>
              </div>
            </div>

            <div className="Biography">
              <h4>Biography</h4>
              <p>
                ¡Soy un apasionado de la conversación, los idiomas y los viajes!
                Me encanta conocer gente nueva, aprender sobre diferentes
                culturas y explorar el mundo. Creo que la mejor manera de
                aprender un idioma es a través de la conversación, por eso me
                encanta hablar con personas de todo el mundo. También disfruto
                mucho aprendiendo sobre diferentes culturas y tradiciones. He
                tenido la suerte de viajar a muchos lugares diferentes y siempre
                estoy buscando nuevas aventuras. Si buscas a alguien con quien
                conversar, aprender un nuevo idioma o compartir tu pasión por
                los viajes, ¡no dudes en contactarme!
              </p>
            </div>

            <div className="Skills">
              <div className="InfoSkills">
                <h4 style={{ color: "black" }}>Reviews</h4>
                <p>
                  Daniel tiene un dominio perfecto del inglés. Su entusiasmo por
                  el idioma es contagioso y siempre está dispuesto/a a compartir
                  su conocimiento.
                </p>
              </div>
            
            </div>
          </div>

          {auth.user?.role!=="Tutor"&& <div>
            <div className="course-offer">
              <div>
                <p>Fee:</p>
                <p>${tutor.price}</p>
              </div>
              <ul className="course-includes">
                <li>
                  <strong>Important Details</strong>
                </li>
                <li>
                  <div className="Div-li">
                    <i className="fas fa-chart-bar"></i> <strong>Level:</strong>
                  </div>
                  <div className="Div-li2">Native</div>
                </li>
                <li>
                  <div className="Div-li">
                    <i className="fas fa-clock"></i> <strong>Duration:</strong>
                  </div>
                  <div className="Div-li2">1h</div>
                </li>
                <li>
                  <div className="Div-li">
                    <i className="fas fa-book-open"></i>{" "}
                    <strong>Age:</strong>
                  </div>
                  <div className="Div-li2">22</div>
                </li>
                <li>
                  <div className="Div-li">
                    <i className="fas fa-question-circle"></i>{" "}
                    <strong>Location:</strong>
                  </div>
                  <div className="Div-li2">Medellín</div>
                </li>
                <li>
                  <div className="Div-li">
                    <i className="fas fa-certificate"></i>{" "}
                    <strong>Certifications:</strong>
                  </div>
                  <div className="Div-li2">Yes</div>
                </li>
                
              </ul>

              <div className="Me_Pagos">
                <strong>Secure Payment:</strong>
                <div className="img-Pagos">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj_s2H-TyiBEMWjQwN5_RAU0xDevhxg6wSIjXxvR_evw&s"
                    alt="paypal"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Old_Visa_Logo.svg"
                    alt="Visa"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png"
                    alt="MasterCard"
                  />
                  <img
                    src="https://w7.pngwing.com/pngs/382/146/png-transparent-american-express-logo-icons-logos-emojis-iconic-brands.png"
                    alt="american express "
                  />
                </div>
              </div>

              <TutorCalendar/>
            </div>
          </div>}
        </div>

        <div className="contGalery">
          <div>
            <h4>My Courses</h4>
            <p>when known printer took a galley of type scrambl edmake</p>
          </div>

          <div className="gallery">
            {/* Recorre el array de URLs de imágenes y renderiza las imágenes */}
            {imageUrls.map((url, index) => (
              <div key={index} className="gallery-item">
                <img src={url}  alt={`Image ${index}`} />
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
}

export default Teach;
