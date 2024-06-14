import React from 'react';
import { useSelector,useDispatch } from "react-redux"
import Footer from '../../shared/Components/Footer/Footer';
import './Teach.css'; // Importa el archivo CSS personalizado
import {Headings,TextArea} from '../Landing.style'
import NavBar from '../../shared/NavBar/NavBar';
import { useParams } from "react-router-dom";
import axios from 'axios'
import { useNavigate} from 'react-router-dom';
import ImageFileUpload from '../../shared/Components/ImageUpload/ImageFileUpdload'

import  Spinner  from '../../shared/Components/Modals/Spinners/Spinner'

import TutorCalendar from '../../shared/Components/Calendar/Tutor_Calendar';
import { useState } from 'react';




const Teach = () => {
  const auth = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const navegate = useNavigate();

  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  
  
  const serverURL = useSelector(state => state.serverURL.url);

  const imageUrls = [
    'https://res.cloudinary.com/danielcruz/image/upload/v1716909415/images/dtzk55ohmu2jzftsx18l.jpg',
    'https://res.cloudinary.com/danielcruz/image/upload/v1716909643/images/ymzsmmghmvskf29tbvhw.jpg',
    'https://res.cloudinary.com/danielcruz/image/upload/v1716909725/images/hak2rldvnkbblv2sjcq3.jpg',
   
];




    const [userProfile,setUserProfile]=useState({});


    const params =useParams()

React.useEffect(()=>{
    axios(`${serverURL}/user/${params.id}`)
    .then(({ data }) => {
       
        if (data.name) {
           
          setUserProfile({
            
            email:data.email,
            name:data.name,
            lastName:data.lastName,
            picture:data.picture,
            biography:data.biography,
            hobbies:data.id,
            price:data.price,
            photos:data.photos,
            rates:'dcr'

          })

          setIsLoading(false)
        } else {
           window.alert('¡Something Wrong!');
        }
     })
     .catch(()=>{
      alert("Not Network")
     })
     return setUserProfile({})
   },[params?.id])






   const handleLogout = () => {  
    window.localStorage.removeItem("userData");
    navegate("/");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
   
    setUserProfile({ ...userProfile, [name]: value });
    console.log("cambio",userProfile)
    fetch("http://localhost:3001/api/userinformation", {
      method: "POST", // Set the request method to POST
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify({...userProfile}), // Convert the user data to JSON string
    })
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        console.log("Success:", data); // Handle the response data
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });
  };


  console.log(userProfile)


    
    return (
      <div className="contenTeach">
        
        <Headings></Headings>
        <NavBar textBotton={"Logout"} onClick={handleLogout}></NavBar>
        <div className="NavTeach"></div>
        {isLoading && <Spinner />} 

        <div className="InfTeach">
          <div>
            <div className="profile-container">
              <div className="profile-picture">
                <img
                  src={userProfile.picture}
                  alt="Foto de perfil"
                  className="rounded-circle"
                  style={{ marginBottom: "10px" }}
                />
                {auth.user?.role === "Tutor" && (
                  <ImageFileUpload
                    id="profile_image"                   
                    text="Change Profile Photo"
                    accept="image/png,image/jpeg"
                    name="profile_image"
                    description="* File format: png or jpeg."
                    className="rounded-circle"
                    onChange={(fileUrl) => {
                      setUserProfile({...userProfile,picture:fileUrl});
                     
                      fetch("http://localhost:3001/api/userinformation", {
                        method: "POST", // Set the request method to POST
                        headers: {
                          "Content-Type": "application/json", // Set the content type to JSON
                        },
                        body: JSON.stringify({...userProfile,picture:fileUrl}), // Convert the user data to JSON string
                      })
                        .then((response) => response.json()) // Parse the response as JSON
                        .then((data) => {
                          console.log("Success:", data); // Handle the response data
                        })
                        .catch((error) => {
                          console.error("Error:", error); // Handle any errors
                        });
                         
                      //  alert("Profile Update")
                    }}
                  />
                )}
              </div>
              
              <div className="profile-info">
                <h2>
                  {userProfile.name} {userProfile.lastName}
                </h2>
                

                <p>📍 Uruguay</p>

                <p style={{ marginLeft: "20px" }}> Hobbies </p>
                <div className="social-icons">
                  <div className="social-icon-wrapper">
                    <a href="#" className="iconos">
                      ✈️
                    </a>
                  </div>
                  <div className="social-icon-wrapper">
                    <a href="#" className="iconos">
                      🥎
                    </a>
                  </div>
                  <div className="social-icon-wrapper">
                    <a href="#" className="iconos">
                      🧠
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {auth.user?.role === "Tutor" ? (
              <TextArea
                className="Biography"
                name="biography"
                value={userProfile.biography}
                onChange={handleChange}
                style={{ resize: "none", height: "200px",marginBottom:'0' }}
              ></TextArea>
            ) : (
              <div className="Biography">
                <h4>Biography</h4>

                <p>{userProfile.biography}</p>
              </div>
            )}
           {!userProfile.rate?"":<div className="Skills">
              <div className="InfoSkills">
                <h4 style={{ color: "black" }}>Reviews</h4>
                <p>
                  Daniel tiene un dominio perfecto del inglés. Su entusiasmo por
                  el idioma es contagioso y siempre está dispuesto/a a compartir
                  su conocimiento.
                </p>
              </div>
            </div>} 
            
          </div>

          {auth.user?.role !== "Tutor" ? (
            <div>
              <div className="course-offer">
                <div>
                  <p>Contribution</p>
                  <p>${userProfile.price}</p>
                </div>
                <ul className="course-includes">
                  <li>
                    <strong>Important Details</strong>
                  </li>
                  <li>
                    <div className="Div-li">
                      <i className="fas fa-chart-bar"></i>{" "}
                      <strong>Level:</strong>
                    </div>
                    <div className="Div-li2">Basic</div>
                  </li>
                  <li>
                    <div className="Div-li">
                      <i className="fas fa-clock"></i>{" "}
                      <strong>Duration:</strong>
                    </div>
                    <div className="Div-li2">1h</div>
                  </li>
                  <li>
                    <div className="Div-li">
                      <i className="fas fa-book-open"></i> <strong>Age:</strong>
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

                <TutorCalendar />
              </div>
            </div>
          ) : (
            <div>
              {/* <h1>Suggeries</h1> */}
            </div>
          )}
        </div>

        <div className="contGalery">
          <div>
            <h4 style={{ color:'#161439'} }>
              Something About me 
            </h4>
          </div>

          <div className="gallery">
           
              <div className="galleryItem">
              {userProfile && Array.isArray(userProfile.photos)&&userProfile?.photos[0]?
              <img src={userProfile?.photos[0]}  alt='ImgProfile#1' />:
              
              auth.user?.role === "Tutor"?<p>Please Upload Pictures</p>:""}

                {auth.user?.role === "Tutor" &&<ImageFileUpload
                    id="img#1"
                    
                    text="Change"
                    accept="image/png,image/jpeg"
                    name="img#1"
                    
                    onChange={(fileUrl) => {
                      const updatedPhotos = [fileUrl, userProfile.photos[1],userProfile.photos[2]];
                      setUserProfile({ ...userProfile, photos: updatedPhotos });
                      let reference=0;
                      let photo=fileUrl;
                      fetch("http://localhost:3001/api/user/update/photo", {
                        method: "POST", // Set the request method to POST
                        headers: {
                          "Content-Type": "application/json", // Set the content type to JSON
                        },
                        body: JSON.stringify({...userProfile,photo,reference}), // Convert the user data to JSON string
                      })
                        .then((response) => response.json()) // Parse the response as JSON
                        .then((data) => {
                          console.log("Success:", data); // Handle the response data
                        })
                        .catch((error) => {
                          console.error("Error:", error); // Handle any errors
                        });
                         


                    }}
                  />
                 }
                    
               
           
                
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="300"
                  height="300"
                  fill="currentColor"
                  className="bi bi-person"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                </svg>

                </div>


                <div className="galleryItem">
              {userProfile && Array.isArray(userProfile.photos)&&userProfile?.photos[1]?
              <img src={userProfile?.photos[1]}  alt='ImgProfile#2' />:
              auth.user?.role === "Tutor"?<p>Please Upload Pictures</p>:""}

                {auth.user?.role === "Tutor" &&<ImageFileUpload
                    id="img#2"
                    
                    text="Change"
                    accept="image/png,image/jpeg"
                    name="img#2"
                    
                    onChange={(fileUrl) => {
                      const updatedPhotos = [userProfile.photos[0],fileUrl,userProfile.photos[2]];
                      setUserProfile({ ...userProfile, photos: updatedPhotos });
                       let reference=1;
                       let photo=fileUrl;
                      fetch("http://localhost:3001/api/user/update/photo", {
                        method: "POST", // Set the request method to POST
                        headers: {
                          "Content-Type": "application/json", // Set the content type to JSON
                        },
                        body: JSON.stringify({...userProfile,photo,reference}), // Convert the user data to JSON string
                      })
                        .then((response) => response.json()) // Parse the response as JSON
                        .then((data) => {
                          console.log("Success:", data); // Handle the response data
                        })
                        .catch((error) => {
                          console.error("Error:", error); // Handle any errors
                        });
                    }}
                  />
                 }
                    
               
                
                
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="300"
                  height="300"
                  fill="currentColor"
                  className="bi bi-person"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                </svg>

               

                </div>
                


                <div className="galleryItem">
              {userProfile && Array.isArray(userProfile.photos)&&userProfile?.photos[2]?
              <img src={userProfile?.photos[2]}  alt='ImgProfile#3' />:
              auth.user?.role === "Tutor"?<p>Please Upload Pictures</p>:""}

                {auth.user?.role === "Tutor" &&<ImageFileUpload
                    id="img#3"
                    
                    text="Change"
                    accept="image/png,image/jpeg"
                    name="img#3"
                    
                    onChange={(fileUrl) => {
                      const updatedPhotos = [userProfile.photos[0],userProfile.photos[1],fileUrl];
                      setUserProfile({ ...userProfile, photos: updatedPhotos });

                      let reference=2;
                      let photo=fileUrl;
                     fetch("http://localhost:3001/api/user/update/photo", {
                       method: "POST", // Set the request method to POST
                       headers: {
                         "Content-Type": "application/json", // Set the content type to JSON
                       },
                       body: JSON.stringify({...userProfile,photo,reference}), // Convert the user data to JSON string
                     })
                       .then((response) => response.json()) // Parse the response as JSON
                       .then((data) => {
                         console.log("Success:", data); // Handle the response data
                       })
                       .catch((error) => {
                         console.error("Error:", error); // Handle any errors
                       });
                    }}
                  />
                 }
                    
               
               
                
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="300"
                  height="300"
                  fill="currentColor"
                  className="bi bi-person"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                </svg>

               

                </div>
            
          </div>
        </div>
        <Footer />
      </div>
    );
}

export default Teach;
