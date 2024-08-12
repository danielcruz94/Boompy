import React from 'react';
import { useSelector,useDispatch,connect} from "react-redux"
import Footer from '../../shared/Components/Footer/Footer';
import './Teach.css'; // Importa el archivo CSS personalizado
import {Headings,
  TextArea,
  H4,

} from '../Landing.style'
import NavBar from '../../shared/NavBar/NavBar';
import { useParams } from "react-router-dom";
import axios from 'axios'
import { useNavigate} from 'react-router-dom';
import ImageFileUpload from '../../shared/Components/ImageUpload/ImageFileUpdload'
import  Spinner  from '../../shared/Components/Modals/Spinners/Spinner'

import TutorCalendar from '../../shared/Components/Calendar/Tutor_Calendar';
import { useState } from 'react';
import  Saldo  from '../../shared/Components/Saldo/saldo'

import {convertirMonedaANumero} from '../../shared/utils/funtions';






const Teach = ({auth}) => {


  
  // const auth = useSelector((state) => state.auth);

  const [location, setLocation] = useState(null);
  const [isLatam, setIsLatam] = useState(false);
 

  const [isLoading, setIsLoading] = useState(true);
  const navegate = useNavigate();


 
  const userDataString = localStorage.getItem('userData');
  const userData = JSON.parse(userDataString);

  

  React.useEffect(() => {
    if(!auth.isLoggedIn){
  
      navegate('/')
     
    }
    window.scrollTo({ top: 0 });




  }, []);

  
    



  const serverURL = useSelector(state => state.serverURL.url);

  function extractNumber(priceStr) {
    // Usar una expresión regular para extraer números
    let number = priceStr.match(/[\d\.]+/);
    // Convertir el número a formato numérico
    return number ? parseFloat(number[0]) : null;
}





    const [userProfile,setUserProfile]=useState({});

    

    const params =useParams()

    React.useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch user data
          const { data } = await axios(`${serverURL}/user/${params.id}`);
          // Fetch location data
          const response = await axios.get('https://ipinfo.io/json');
          const countryCode = response.data.country?.toUpperCase();
          setLocation(response.data.country);
          
          // Check if the country is in LATAM
          const latamCountries = ['AR', 'BO', 'BR', 'CL', 'CO', 'CR', 'CU', 'DO', 'EC', 'SV', 'GT', 'HN', 'MX', 'NI', 'PA', 'PY', 'PE', 'PR', 'UY', 'VE'];
          const isInLatam = latamCountries.includes(countryCode);
          setIsLatam(isInLatam);

          let numericPrice = extractNumber(data.price);

         if(isInLatam === true){
              numericPrice = numericPrice + 1;
         }

         if(isInLatam === false){
          numericPrice = numericPrice + 3 
         }

        
          
          // Update user profile state
          if (data.name) {
            setUserProfile({
              email: data.email,
              name: data.name,
              lastName: data.lastName,
              picture: data.picture,
              biography: data.biography,
              hobbies: data.id,
              price: numericPrice,
              photos: data.photos,
              country: data.country,
              rates: data.teacherRates,
              instagram: data.instagram
            });
          } else {
            window.alert('¡Something Wrong!');
          }
        } catch (error) {
          alert('Not Network');
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, [params?.id]);






   const handleLogout = () => {
    window.localStorage.removeItem("userData");
    navegate("/");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserProfile({ ...userProfile, [name]: value });

    fetch(`${serverURL}/userinformation`, {
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

    const handleClick = () => {
      if (auth.user?.role === "Tutor") {
        navegate('/instagram'); // Corrección del error de tipeo aquí
      } else {
        const instagramUrl = userProfile.instagram;
        if (instagramUrl && /^https?:\/\//.test(instagramUrl)) { // Verifica que sea una URL válida
         // window.open(instagramUrl, '_blank');
        } else {
          console.error("URL de Instagram no válida");
        }
      }
    };
      


    return (
      <div className="contenTeach">
        <Headings></Headings>

        { <NavBar textBotton={"Logout"} onClick={handleLogout}></NavBar> }      

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
                      setUserProfile({ ...userProfile, picture: fileUrl });

                      fetch(`${serverURL}/userinformation`, {
                        method: "POST", // Set the request method to POST
                        headers: {
                          "Content-Type": "application/json", // Set the content type to JSON
                        },
                        body: JSON.stringify({
                          ...userProfile,
                          picture: fileUrl,
                        }), // Convert the user data to JSON string
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

                <p>📍 {userProfile.country}</p>


                <div className="social-icons">
                  <div className="social-icon-wrapper">
                    <span href="#" className="iconos">
                      📖
                    </span>
                  </div>
                  <div className="social-icon-wrapper">
                    <span href="#" className="iconos">
                      ⚽️
                    </span>
                  </div>
                  <div className="social-icon-wrapper">
                    <span href="#" className="iconos">
                      🧠
                    </span>
                  </div>

                  {!(userData.role === "Student" && userProfile.instagram === "") && (
               <div className="social-icon-wrapper instagram" onClick={handleClick} style={{ display: 'block' }}>
                  <span className="iconos">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                      alt="Instagram"
                      style={{ width: '15px', height: '15px' }}
                    />
                  </span>
                </div>
              )}

                  
                </div>
              </div>
            </div>

            {auth.user?.role === "Tutor" ? (
              <div className="Biography" style={{border:'none',padding:'0'}}>

              <b><p>Biography</p></b><span>Type something about you</span>
                <TextArea
                className="Biography"
                name="biography"
                value={userProfile.biography}
                onChange={handleChange}
                style={{ resize: "none",width:'100%' }}
              ></TextArea>

              </div>

            ) : (
              <div className="Biography">
                <h4>Biography</h4>

                <p>{userProfile.biography}</p>
              </div>
            )}
            {!userProfile.rate ? (
              ""
            ) : (
              <div className="Skills">
                <div className="InfoSkills">
                  <h4 style={{ color: "black" }}>Reviews</h4>
                  <p>
                    Daniel tiene un dominio perfecto del inglés. Su entusiasmo
                    por el idioma es contagioso y siempre está dispuesto/a a
                    compartir su conocimiento.
                  </p>
                </div>
              </div>
            )}
          </div>

            <div className="TeachSaldo">
            <Saldo/>
            </div>
         

          {auth.user?.role !== "Tutor" ? (
            <div className="payment">
              <div className="course-offer">
                <div>
                  <p>Contribution</p>
                  <p className="price">{"$" + userProfile.price + " USD"}</p>

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
                  {/* <li>
                    <div className="Div-li">
                      <i className="fas fa-book-open"></i> <strong>Age:</strong>
                    </div>
                    <div className="Div-li2">22</div>
                  </li> */}
                  <li>
                    <div className="Div-li">
                      <i className="fas fa-question-circle"></i>{" "}
                      <strong>Location:</strong>
                    </div>
                    <div className="Div-li2">{userProfile.country}</div>
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
                
                <TutorCalendar pagina="Tutor" ID="Null" amount={userProfile.price} />

                {/* userProfile.country?extractNumber(userProfile.country):'6.00' */}
                </div>

            </div>
          ) : (
            <div>{/* <h1>Suggeries</h1> */}</div>
          )}
        </div>

        <div className="contGalery">


          <div className="gallery">
            <div className="galleryItem">
              {userProfile &&
              Array.isArray(userProfile.photos) &&
              userProfile?.photos[0] ? (
                <img src={userProfile?.photos[0]} alt="ImgProfile#1" />
              ) : auth.user?.role === "Tutor" ? (
                <p>Please Upload Pictures</p>
              ) : (
                ""
              )}

              {auth.user?.role === "Tutor" && (
                <ImageFileUpload
                  id="img#1"
                  text="Change"
                  accept="image/png,image/jpeg"
                 
                  name="img#1"
                  onChange={(fileUrl) => {
                    const updatedPhotos = [
                      fileUrl,
                      userProfile.photos[1],
                      userProfile.photos[2],
                    ];

                    setUserProfile({ ...userProfile, photos: updatedPhotos });
                    let reference = 0;
                    let photo = fileUrl;
                    fetch(`${serverURL}/user/update/photo`, {
                      method: "POST", // Set the request method to POST
                      headers: {
                        "Content-Type": "application/json", // Set the content type to JSON
                      },
                      body: JSON.stringify({
                        ...userProfile,
                        photo,
                        reference,
                      }), // Convert the user data to JSON string
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
              )}

              {userProfile &&
                Array.isArray(userProfile.photos) &&
                !userProfile.photos[0] && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="300"
                    fill="currentColor"
                    className="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                  </svg>
                )}
            </div>

            <div className="galleryItem">
              {userProfile &&
              Array.isArray(userProfile.photos) &&
              userProfile?.photos[1] ? (
                <img src={userProfile?.photos[1]} alt="ImgProfile#2" />
              ) : auth.user?.role === "Tutor" ? (
                <p>Please Upload Pictures</p>
              ) : (
                ""
              )}

              {auth.user?.role === "Tutor" && (
                <ImageFileUpload
                  id="img#2"
                  text="Change"
                  accept="image/png,image/jpeg"
                  name="img#2"
             
                  onChange={(fileUrl) => {
                    const updatedPhotos = [
                      userProfile.photos[0],
                      fileUrl,
                      userProfile.photos[2],
                    ];
                    setUserProfile({ ...userProfile, photos: updatedPhotos });

                    let reference = 1;
                    let photo = fileUrl;
                    fetch(`${serverURL}/user/update/photo`, {
                      method: "POST", // Set the request method to POST
                      headers: {
                        "Content-Type": "application/json", // Set the content type to JSON
                      },
                      body: JSON.stringify({
                        ...userProfile,
                        photo,
                        reference,
                      }), // Convert the user data to JSON string
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
              )}

              {userProfile &&
                Array.isArray(userProfile.photos) &&
                !userProfile.photos[1] && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="300"
                    fill="currentColor"
                    className="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                  </svg>
                )}
            </div>

            <div className="galleryItem">
              {userProfile &&
              Array.isArray(userProfile.photos) &&
              userProfile?.photos[2] ? (
                <img src={userProfile?.photos[2]} alt="ImgProfile#3" />
              ) : auth.user?.role === "Tutor" ? (
                <p>Please Upload Pictures</p>
              ) : (
                ""
              )}

              {auth.user?.role === "Tutor" && (
                <ImageFileUpload
                  id="img#3"
                  text="Change"
                  accept="image/png,image/jpeg"
               
                  name="img#3"
                  onChange={(fileUrl) => {
                    const updatedPhotos = [
                      userProfile.photos[0],
                      userProfile.photos[1],
                      fileUrl,
                    ];
                    setUserProfile({ ...userProfile, photos: updatedPhotos });

                    let reference = 2;
                    let photo = fileUrl;
                    fetch(`${serverURL}/user/update/photo`, {
                      method: "POST", // Set the request method to POST
                      headers: {
                        "Content-Type": "application/json", // Set the content type to JSON
                      },
                      body: JSON.stringify({
                        ...userProfile,
                        photo,
                        reference,
                      }), // Convert the user data to JSON string
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
              )}

              {userProfile &&
                Array.isArray(userProfile.photos) &&
                !userProfile.photos[2] && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="300"
                    fill="currentColor"
                    className="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                  </svg>
                )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );

   
}
const mapStateToProps = (state) => ({
  auth: state.auth,
 
});

export default connect(mapStateToProps)(Teach);
