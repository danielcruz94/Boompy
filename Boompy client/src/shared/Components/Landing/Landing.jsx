
import React, { useState, useEffect } from 'react';
import './Landing.css'; 
import {Bottom} from '../../../views/Landing.style'

import bannerImage from './Home/banner_img.png';
import imaheImage from './Home/Imahe.png';
import dacoImage from './Home/Daco.png';
import questionImage from './Home/question.png'; 
import NavBar from '../../NavBar/NavBar';
import {Headings} from '../../../views/Landing.style'
import Footer from '../Footer/Footer';
import { useNavigate} from 'react-router-dom';



function Landing() {
  const [carouselData1, setCarouselData1] = useState([]);
  const [carouselData2, setCarouselData2] = useState([]);

  const navegate =useNavigate()

  

  useEffect(() => {
    // Función para cargar el primer JSON
    const fetchCarouselData1 = async () => {
      try {
        const response = await fetch('../../../../public/Datos/carouselData1.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch carouselData1: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setCarouselData1(data);
        console.log('CarouselData1 loaded successfully:', data);
      } catch (error) {
        console.error('Error fetching carouselData1:', error);
      }
    };
  
    // Función para cargar el segundo JSON
    const fetchCarouselData2 = async () => {
      try {
        const response = await fetch('../../../../public/Datos/carouselData2.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch carouselData2: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setCarouselData2(data);
        console.log('CarouselData2 loaded successfully:', data);
      } catch (error) {
        console.error('Error fetching carouselData2:', error);
      }
    };
  
    // Llamar a las funciones de carga de datos al montar el componente
    fetchCarouselData1();
    fetchCarouselData2();
  }, []); // El segundo argumento [] asegura que el efecto se ejecute solo una vez, al montar el componente
  
const go=() => {
  // console.log("hihas")
   navegate('/login')
}

  return (
    <div className="containerHome">
      <Headings >
      <Bottom onClick={go} style={{height:'30px',marginTop:'10px',marginLeft:'5px'}}>Login</Bottom>
      </Headings>
      {/* <NavBar textBotton={"Login"} onClick={go}/> */}
    
      {/* Sección 1 */}
      <section className="hero">
        <div>
          <div className="left-div">
            <div>
              <h2>
                Never Stop Learning <br />
                Life <b>Never Stop</b> Teaching
              </h2>
              <p>
                Every teaching and learning journey is unique Following<br />
                Well help guide your way
              </p>

              <button>Star Free Trial</button>
            </div>
          </div>
          <div className="right-div">
            <img src={bannerImage} alt="Boompy" />
          </div>
        </div>
      </section>

      {/* Sección de 2 */}
      <section className="categories-section">
        <h5>Trending Categories</h5>
        <h3>Top Category We Have</h3>
        <p>when known printer took a galley of type scrambl edmake</p>
        <div className="category">
          <div className="carousel-container">
            <button className="prev"> &lt; </button>
            <div className="carousel">
              {carouselData1.map((item, index) => (
                <div key={index} className="slide">
                  <img src={item.image} alt={item.alt} />
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
            <button className="next"> &gt; </button>
          </div>
        </div>
      </section>

      {/* Sección de 3 */}
      <section className="hero Hero2">
        <div>
          <div className="right-div">
            <img src={imaheImage} alt="Boompy" />
          </div>

          <div className="left-div left-div2">
            <div>
              <h2>
                Thousand Of Top Courses<br /> Now In One Place
              </h2>
              <p>
                Groove's intuitive shared inbox makes it easy for team members to organize, prioritize and. In this episode of the Smashing Pod we're talking about Web Platform Baseline
              </p>

              <ul>
                <li className="campo">The Most World Class Instructors</li>
                <li className="campo">Access Your Class anywhere</li>
                <li className="campo">Flexible Course Plan</li>
              </ul>

              <button>Star Free Trial</button>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de 2 */}
      <section className="categories-section categories-section2 ocultar">
        <h5>Top Class Courses</h5>
        <h3>Explore Our World's Best Courses</h3>
        <p>When known printer took a galley of type scrambl edmake</p>
        <div className="category category2">
          <div className="carousel-container">
            <button className="prev2"> &lt; </button>
            <div className="carousel">
              {carouselData2.map((item, index) => (
                <div key={index} className="slide slide2">
                  <img src={item.image} alt={item.alt} />
                  <div>
                    {item.rating}
                    <i className="fas fa-star"></i>
                  </div>
                  <p>{item.text}</p>
                  <button className="Enrol"> Enroll Now &gt;</button>
                </div>
              ))}
            </div>
            <button className="next2"> &gt; </button>
          </div>
        </div>
      </section>

      <section className="categories-section categories-section2">
  <h5>Top Class Courses</h5>
  <h3>Explore Our Worlds Best Courses</h3>
  <p>When known printer took a galley of type scrambledmake</p>
  <div className="category category2">
    <div className="course-images">
      {carouselData2.slice(0, 5).map((item, index) => (
        <div key={index} className="course-image">
          <img src={item.image} alt={item.alt} />
          <div className="text-container">
            <div className="image-details">
              <div className="rating">{item.rating}<i className="fas fa-star"></i></div>
              <p>{item.text}</p>
              <button className="Enrol">Enroll Now &gt;</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      <div className="subscribe">
        <div>
          <img src={dacoImage} alt="Boompy" />
        </div>

        <div>
          <h2>
            Want To Stay Informed About<br /> New Courses & Study?
          </h2>
          <div className="InputSus">
            <input type="text" placeholder="Type Your E-Mail" />
            <button>Suscribe Now</button>
          </div>
        </div>
      </div>

{/*IMAGENES DEL SEGUNDO JSON */}
<section className="hero4">
  <div>
    <h5>Skilled Introduce</h5>
    <h3>
      Our Top Class & Expert Instructors In One Place
    </h3>
    <p>
      when an unknown printer took a galley of type and scrambled makespecimen book has survived not only five centuries
    </p>
    <button className="H_button">See All Instructors</button>
  </div>

  <div>
    {carouselData2.slice(0, 2).map((item, index) => (
      <div key={index} className="H_img">
        <div>
          <img src={item.image} alt="Boompy" />
        </div>
        <div>
          <h5>Name</h5>
          <div>
            {item.rating}
            <i className="fas fa-star"></i>
          </div>
          <p>Spanish</p>
          <p>{item.language}</p>
          <div>
            <i className="fab fa-facebook-square mr-3"></i>
            <i className="fab fa-twitter-square mr-3"></i>
            <i className="fab fa-instagram-square mr-3"></i>
          </div>
        </div>
      </div>
    ))}
  </div>

  <div>
    {carouselData2.slice(2, 4).map((item, index) => (
      <div key={index} className="H_img">
        <div>
          <img src={item.image} alt="Boompy" />
        </div>
        <div>
          <h5>Name</h5>
          <div>
            {item.rating}
            <i className="fas fa-star"></i>
          </div>
          <p>Spanish</p>
          <p>{item.language}</p>
          <div>
            <i className="fab fa-facebook-square mr-3"></i>
            <i className="fab fa-twitter-square mr-3"></i>
            <i className="fab fa-instagram-square mr-3"></i>
          </div>
        </div>
      </div>
    ))}
  </div>
  
</section>


      <section className="questions">
        <div>
          <img src={questionImage} alt="Boompy" />
        </div>

        <div>
        <h1>Start Learning From Worlds Pro Instructors</h1>
        <p>Grooves intuitive shared inbox makes it easy for team members to organize, prioritize and. In this episode.</p>
        <p>Whats Boompy Want to give you? Grooves intuitive shared inbox makes it easy for team members to organize, prioritize, and. In this episode. Survived not only five centuries. Edhen an unknown printer took a galley of type and scrambl</p>
        <p>Why choose us for your education?</p>
        <p>How We Provide Service For you?</p>
        <p>Are you Affordable For Your Course</p>
        </div>
      </section>

      <section className="Learning">
        <div className="top-div">
          <h5>How We Start Journey</h5>
          <h3>Start Your Learning Journey Today!</h3>
          <p>Grooves intuitive shared inbox makesteam members together</p>
          <p>organize, prioritize and.In this episode.</p>
        </div>

        <div className="low-div">
          <div>
            <i className="fas fa-users custom-icon"></i>
            <strong>Learn with Experts</strong>
            <span>Curate anding area share Pluralsight</span>
            <span>content to reach your</span>
          </div>

          <div>
            <i className="fas fa-laptop custom-icon"></i>
            <strong>Learn Anything</strong>
            <span>Curate anding area share Pluralsight</span>
            <span>content to reach your</span>
          </div>

          <div>
            <i className="fas fa-award custom-icon"></i>
            <strong>Get Online Certificate</strong>
            <span>Curate anding area share Pluralsight</span>
            <span>content to reach your</span>
          </div>

          <div>
            <i className="fas fa-envelope custom-icon"></i>
            <strong>E-mail Marketing</strong>
            <span>Curate anding area share Pluralsight</span>
            <span>content to reach your</span>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default Landing;
