import React from 'react';
import Footer from '../../shared/Components/Footer/Footer';
import './Teach.css'; // Importa el archivo CSS personalizado
import {Headings} from '../Landing.style'
import NavBar from '../../shared/NavBar/NavBar';
import { useParams } from "react-router-dom";
import axios from 'axios'
import FloatingCalendar from '../../shared/Components/Calendar/Calendar';

const Teach = () => {

    const imageUrls = [
        'https://www.muypymes.com/wp-content/uploads/2012/03/mujer_trabajadora.jpg',
        'https://www.muypymes.com/wp-content/uploads/2012/03/mujer_trabajadora.jpg',
        'https://www.muypymes.com/wp-content/uploads/2012/03/mujer_trabajadora.jpg',
        // Agrega más URLs de imágenes aquí según sea necesario
    ];

    const [tutor,setTutor]=React.useState({})
    const params =useParams()

React.useEffect(()=>{
    axios(`http://localhost:3001/api/user/${params.id}`)
    .then(({ data }) => {
        console.log(data)
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




    
    return (
        <div className="contenTeach">
            <Headings>
            </Headings>
            <NavBar>

            </NavBar>
            <div className="NavTeach">
                <p>Home &gt; Instructors &gt; NameInstructor</p>
            </div>

            <div className="InfTeach">
                <div>
                    <div className="profile-container">
                        <div className="profile-picture">
                            <img src={tutor.picture} alt="Foto de perfil" className="rounded-circle" />
                        </div>
                        <div className="profile-info">
                            <h2>{tutor.name} {tutor.lastName}</h2>
                            <p>Experto en Laravel</p>
                            <div>
                            <p className="contact-info"><i className="fas fa-star Start"></i> 4.8 Opiniones</p>
                            <p className="contact-info"><i className="far fa-envelope icon"></i> info@gmail.com</p>
                            <p className="contact-info"><i className="fas fa-phone-alt icon"></i> +123 5950 600</p>

                            </div>
                            <p>Gurusu mal suada faci lsis Lorem ipsum dolorit amore consectetur Vesity bulum a nec odio aea the dumm ipsumm ipsum that dolcons us saiad and fariat consectetur elit.</p>
                            <div className="social-icons">
                               
                                <div className="social-icon-wrapper">
                                    <a href="#" className="social-icon"><i className="fab fa-facebook-f icon"></i></a>
                                </div>
                                <div className="social-icon-wrapper">
                                    <a href="#" className="social-icon"><i className="fab fa-twitter icon"></i></a>
                                </div>
                                <div className="social-icon-wrapper">
                                    <a href="#" className="social-icon"><i className="fab fa-linkedin-in icon"></i></a>
                                </div>

                                <FloatingCalendar />
                            </div>
                        </div>
                    </div>

                    <div className="Biography">
                        <h4>Biography</h4>
                        <p>
                            Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
                            lacus vel facilisis.dolor sit amet, consectetur adipiscing elited do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua.
                            Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utte labore
                            et dolore magna aliquauis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan.
                        </p>
                    </div>

                    <div className="Skills">
                        <div className="InfoSkills">
                            <h4>Skills</h4>
                            <p>
                                Dorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna
                                aliqua Quis ipsum suspendisse ultrices gravida. Risus commodo
                                viverra maecenas accumsa.
                            </p>
                        </div>

                        <div className="skills-container">
                            <div className="left-skills">
                                <div className="skill">
                                    <div className="skillCon">
                                        <span className="skill-name">PHP</span>
                                        <div className="progress-percent">80%</div>
                                    </div>                                   
                                    <div className="progress-bar" style={{ width: '80%' }}></div>
                                </div>
                                <div className="skill">
                                    <div className="skillCon">
                                        <span className="skill-name">React</span>
                                        <div className="progress-percent">70%</div>
                                    </div>
                                   
                                    <div className="progress-bar" style={{ width: '70%' }}></div>
                                </div>
                            </div>
                            <div className="right-skills">
                                <div className="skill">
                                    <div className="skillCon">
                                        <span className="skill-name">Java</span>
                                        <div className="progress-percent">60%</div>
                                    </div>
                                  
                                    <div className="progress-bar" style={{ width: '60%' }}></div>
                                </div>
                                <div className="skill">
                                    <div className="skillCon">
                                        <span className="skill-name">Angular</span> 
                                        <div className="progress-percent">50%</div>
                                    </div>
                                    
                                    <div className="progress-bar" style={{ width: '50%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>



                    
                </div>

                <div>
                    <div className="course-offer">
                        <div>
                            <p>This Course Fee:</p>
                            <p>${tutor.price}</p>
                        </div>
                        <ul className="course-includes">
                            <li><strong>Course Includes</strong></li>
                            <li>
                                <div className="Div-li">
                                    <i className="fas fa-chart-bar"></i> <strong>Level:</strong>
                                </div>
                                <div className="Div-li2">Expert</div>
                            </li>
                            <li>
                                <div className="Div-li">
                                    <i className="fas fa-clock"></i> <strong>Duration:</strong>
                                </div>
                                <div className="Div-li2">11h 20m</div>
                            </li>
                            <li>
                                <div className="Div-li">
                                    <i className="fas fa-book-open"></i> <strong>Lessons:</strong>
                                </div>
                                <div className="Div-li2">12</div>
                            </li>
                            <li>
                                <div className="Div-li">
                                    <i className="fas fa-question-circle"></i> <strong>Quizzes:</strong>
                                </div>
                                <div className="Div-li2">145</div>
                            </li>
                            <li>
                                <div className="Div-li">
                                    <i className="fas fa-certificate"></i> <strong>Certifications:</strong>
                                </div>
                                <div className="Div-li2">Yes</div>
                            </li>
                            <li>
                                <div className="Div-li">
                                    <i className="fas fa-graduation-cap"></i> <strong>Graduation:</strong>
                                </div>
                                <div className="Div-li2">25K</div>
                            </li>
                        </ul>

                        <div className="Me_Pagos">
                            <strong>Secure Payment:</strong>
                            <div className="img-Pagos">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj_s2H-TyiBEMWjQwN5_RAU0xDevhxg6wSIjXxvR_evw&s" alt="paypal" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Old_Visa_Logo.svg" alt="Visa" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png" alt="MasterCard" />
                                <img src="https://w7.pngwing.com/pngs/382/146/png-transparent-american-express-logo-icons-logos-emojis-iconic-brands.png" alt="american express " />
                            </div>
                        </div>

                        <button className="btnPagos">See All Instructors </button>
                    </div>
                </div>
            </div>

                <div className='contGalery'> 
                       <div>
                            <h4>My Courses</h4>
                            <p>
                            when known printer took a galley of type scrambl edmake
                            </p>
                        </div>


                            <div className="gallery">
                                {/* Recorre el array de URLs de imágenes y renderiza las imágenes */}
                                {imageUrls.map((url, index) => (
                                    <div key={index} className="gallery-item">
                                        <img src={url} alt={`Image ${index}`} />
                                    </div>
                                ))}
                            </div> 

                </div>
                <Footer/>
                        




        </div>
    );
}

export default Teach;
