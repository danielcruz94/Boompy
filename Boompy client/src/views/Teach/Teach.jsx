import React from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import "./Teach.css";
import NavBar from "../../shared/NavBar/NavBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ImageFileUpload from "../../shared/Components/ImageUpload/ImageFileUpdload";
import Spinner from "../../shared/Components/Modals/Spinners/Spinner";
import CalendarClass from "../../shared/Components/Calendar/Calendar_Class";
import TutorCalendar from "../../shared/Components/Calendar/Tutor_Calendar";
import { useState } from "react";
import Saldo from "../../shared/Components/Saldo/saldo";
import Settings from "../../shared/Components/Settings/Settings";

import { convertirMonedaANumero } from "../../shared/utils/funtions";

const Teach = ({ auth }) => {

 console.log(auth)

  const [location, setLocation] = useState(null);
  const [isLatam, setIsLatam] = useState(false);

  const [flagUrl, setFlagUrl] = useState("");

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const navegate = useNavigate();

  const [isLoaded1, setIsLoaded1] = useState(false);
  const [isLoaded2, setIsLoaded2] = useState(false);
  const [isLoaded3, setIsLoaded3] = useState(false);

  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString);

  const [userProfile, setUserProfile] = useState({});

  React.useEffect(() => {
    // No hacer nada si no hay un país ingresado
    if (!userProfile.country) {
      return;
    }

    // Función para obtener la bandera
    const fetchFlag = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${userProfile.country}`
        );
        const flag = response.data[0].flags.png; // URL de la bandera
        setFlagUrl(flag);
      } catch (err) {
        setFlagUrl("");
      }
    };

    fetchFlag();
  }, [userProfile]);

  const handleLoad1 = () => {
    setIsLoaded1(true);
  };

  const handleLoad2 = () => {
    setIsLoaded2(true);
  };

  const handleLoad3 = () => {
    setIsLoaded3(true);
  };

  React.useEffect(() => {
    if (!auth.isLoggedIn) {
      navegate("/");
    }
    window.scrollTo({ top: 0 });
  }, []);

  const serverURL = useSelector((state) => state.serverURL.url);

  function extractNumber(priceStr) {
    let number = priceStr.match(/[\d\.]+/);
    return number ? parseFloat(number[0]) : null;
  }

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const closeCalendar = () => {
    setIsCalendarOpen(false);
  };

  const params = useParams();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const { data } = await axios(`${serverURL}/user/${params.id}`);
        // Fetch location data
        const response = await axios.get("https://ipinfo.io/json");
        const countryCode = response.data.country?.toUpperCase();
        setLocation(response.data.country);

        // Check if the country is in LATAM
        const latamCountries = [
          "AR", "BO","BR","CL","CO","CR","CU","DO","EC", "SV","GT","HN","MX","NI","PA","PY","PE","PR","UY","VE",
        ];
        const isInLatam = latamCountries.includes(countryCode);
        setIsLatam(isInLatam);

        let numericPrice = extractNumber(data.price);

        if (isInLatam === true) {
          numericPrice = numericPrice + 1;
        }

        if (isInLatam === false) {
          numericPrice = numericPrice + 3;
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
            instagram: data.instagram,
          });
        } else {
          window.alert("¡Something Wrong!");
        }
      } catch (error) {
        alert("Not Network");
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
      body: JSON.stringify({ ...userProfile }), // Convert the user data to JSON string
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
      navegate("/instagram"); // Corrección del error de tipeo aquí
    } else {
      const instagramUrl = userProfile.instagram;
      if (instagramUrl && /^https?:\/\//.test(instagramUrl)) {
        // Verifica que sea una URL válida
        // window.open(instagramUrl, '_blank');
      } else {
        console.error("URL de Instagram no válida");
      }
    }
  };

  return (
    <div className="contenTeach">
      <div className="PQRS black">
        <p className="black">PQRS</p>
        <div>
          <img src="/landing/Icono.png" alt="TORII" className="Icon_TORII" />
        </div>
      </div>

      {<NavBar textBotton={"Cerrar Torii"} onClick={handleLogout}></NavBar>}

      <div className="NavTeach"></div>
      {isLoading && <Spinner />}

      <div className="InfTeach">
        <div>
          <div className="profile-container">
            <div className="profile-container-name">
              <h2>{userProfile.name}</h2>

              <div className="profile-picture">
                {auth.user?.role === "Tutor" && userProfile.picture && (
                  <ImageFileUpload
                    id="profile_image"
                    text=""
                    accept="image/png,image/jpeg"
                    name="profile_image"
                    description="* File format: png or jpeg."
                    className="SubirIMG"
                    url={userProfile.picture}
                    onChange={(fileUrl) => {
                      // Actualiza el perfil del usuario con la nueva imagen
                      setUserProfile({ ...userProfile, picture: fileUrl });

                      // Envía la información al servidor
                      fetch(`${serverURL}/userinformation`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          ...userProfile,
                          picture: fileUrl,
                        }),
                      })
                        .then((response) => response.json())
                        .then((data) => {
                          console.log("Profile updated successfully:", data);
                        })
                        .catch((error) => {
                          console.error("Error updating profile:", error);
                        });
                    }}
                  />
                )}
              </div>

              <h2>{userProfile.lastName}</h2>
              <div className="responsive-name" >
                  <div></div>
                      <h3>
                      {userProfile.name} {userProfile.lastName}
                      </h3>
                  
              </div>
            
            </div>
            {userProfile?.country && (
              <div className="Div-li2">
                <span>{userProfile.country}</span>
                <img className="bandera" src={flagUrl} alt="Bandera" />
              </div>
            )}
 
 {auth.user?.role === "Tutor" && (
  <>
    <div className="TeachSaldo">
      <Saldo />
      <Settings />
    </div>

    <div className="contenCalendar">
      <p
        className="SubHeading"
        onClick={toggleCalendar}
        style={{ cursor: "pointer", fontWeight: "bold" }}
      >
        Agendar día
      </p>
      {isCalendarOpen && (
        <CalendarClass
          isOpen={isCalendarOpen}
          onRequestClose={closeCalendar}
          onClose={closeCalendar}
        />
      )}
    </div>
  </>
)}



            
              <div className="social-icons">
                <div className="social-icon-wrapper">
                  <span href="#" className="iconos">
                    📖 Lerr
                  </span>
                </div>
                <div className="social-icon-wrapper">
                  <span href="#" className="iconos">
                    ⚽️ Futbol
                  </span>
                </div>
                <div className="social-icon-wrapper">
                  <span href="#" className="iconos">
                    🧠 Estudiar
                  </span>
                </div>

                {!(
                  userData.role === "Student" && userProfile.instagram === ""
                ) && (
                  <div
                    className="social-icon-wrapper instagram"
                    onClick={handleClick}
                    style={{ display: "none" }}
                  >
                    <span className="iconos">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                        alt="Instagram"
                        style={{ width: "15px", height: "15px" }}
                      />
                    </span>
                  </div>
                )}
              
            </div>
          </div>

          {auth.user?.role === "Tutor" ? (
            <div className="Biografia" style={{ border: "none", padding: "0" }}>
              <b>
                <p>Biografia</p>
              </b>
              <textarea
                name="biography"
                value={userProfile.biography}
                onChange={handleChange}               
              ></textarea>
            </div>
          ) : (
            <div className="Biography">

              <div className="Me_Pagos">
            <div>              
                <p className="price">Contribución:  {"$" + userProfile.price + " USD"}</p>
              </div>
                <strong>Paga Seguro:</strong>
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

                <TutorCalendar
                pagina="Tutor"
                ID="Null"
                amount={userProfile.price}
              />
              </div>

              <h4>Biografia</h4>

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
                  Daniel tiene un dominio perfecto del inglés. Su entusiasmo por
                  el idioma es contagioso y siempre está dispuesto/a a compartir
                  su conocimiento.
                </p>
              </div>
            </div>
          )}
        </div>

        

        

        {auth.user?.role !== "Tutor" ? (
          <div className="payment">
            <div className="course-offer">
              
              <ul className="course-includes">
                
                <li>
                  <div className="Div-li">
                    <i className="fas fa-chart-bar"></i> <strong>Nivel:</strong> <p>Basico</p>
                  </div>
                  
                </li>
                <li>
                  <div className="Div-li">
                    <i className="fas fa-clock"></i> <strong>Duracion:</strong><p>1 hr</p>
                  </div>
                 
                </li>
                { /*<li>
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
                </li>
                */}
                <li>
                  <div className="Div-li">
                    <i className="fas fa-certificate"></i>{" "}
                    <strong>Certificado:</strong> <p>Si</p>
                  </div>
                  
                </li>
              </ul>

              

              

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
                    <img
                      src={userProfile?.photos[0]}
                      alt="ImgProfile#1"
                      onLoad={handleLoad1}
                      style={{ display: isLoaded1 ? "block" : "none" }}
                    />
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
                    <img
                      src={userProfile?.photos[1]}
                      alt="ImgProfile#2"
                      onLoad={handleLoad2}
                      style={{ display: isLoaded2 ? "block" : "none" }}
                    />
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
                    <img
                      src={userProfile?.photos[2]}
                      alt="ImgProfile#3"
                      onLoad={handleLoad3}
                      style={{ display: isLoaded3 ? "block" : "none" }}
                    />
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


      <div className="Footer FooterTeach">
          <img src="/landing/logo.png" alt="TORII" className="Logo_TORII" />

           <div className='Footer-icon'>
           <a href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-facebook iconSocial"
                viewBox="0 0 16 16"
              >
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
              </svg>
            </a>
            <a href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-twitter-x iconSocial"
                viewBox="0 0 16 16"
              >
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
              </svg>
            </a>
            <a href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-whatsapp iconSocial"
                viewBox="0 0 16 16"
              >
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
              </svg>
            </a>
            <a href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-instagram iconSocial"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
              </svg>
            </a>
            <a href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-youtube iconSocial"
                viewBox="0 0 16 16"
              >
                <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
              </svg>
            </a>
           </div>

            <p>
            © 2024 Torii. All rights reserved | Terminos y Condiciones | Politica de privacidad de datos
            </p>
          </div>


      
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Teach);
