
import  {useEffect,React,useState}from "react"
import {Container,
  Headings,
  ContainerTitle,
  BackgrounModal,
  H3
  } from './Landing.style'
import {ContainerProfile} from '../shared/Components/Cards/Cards.style'
import NavBar from '../shared/NavBar/NavBar'

import Form from '../shared/Components/FormLogin/Form'
import Footer from '../shared/Components/Footer/Footer'
import CardProfile from "../shared/Components/Cards/CardProfile"
import { useSelector,useDispatch,connect } from "react-redux"
import axios from 'axios'
import {fetchUsers} from '../Redux/usersSlice'
import Modal from "../shared/Components/Modals/Modal"
import { useNavigate} from 'react-router-dom';
import {login,completeInfo} from '../Redux/authSlice'
import Section from '../assets/Section.svg';
      
      


const Home = ({auth}) => {
  const users = useSelector((state) => state.users);
  // const auth = useSelector((state) => state.auth);
  const serverURL = useSelector(state => state.serverURL.url);
  
  const [location, setLocation] = useState('');
  const [isInLatam, setIsLatam] = useState(false);

  const dispatch = useDispatch();
  const navegate = useNavigate();

  //locals Variable

  const [isLoading, setIsLoading] = useState(true); // Estado de carga inicial

  const [localUser, setLocalUser] = useState({
    email: auth.user?.email,
    token: auth.user?.token,
    name: auth.user?.name,
    role:auth.user?.role
  });

  const [showTinyImg, setShowTinyImg] = useState(false); // Estado para cada tarjeta

  const handleMouseEnter = (idUser) => {

    setTimeout(() => {
      setShowTinyImg(idUser);
    }, 100);
   
     // Establece la ID de la tarjeta sobre la que se pasa el mouse
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setShowTinyImg(false);
    }, 100);
     // Reinicia al salir del mouse
  };


  

  useEffect(() => {    
    const fetchLocationData = async () => {
      try {      
        const response = await axios.get('https://ipinfo.io/json');
        const countryCode = response.data.country?.toUpperCase();
        setLocation(response.data.country);
        
       
        const latamCountries = ['AR', 'BO', 'BR', 'CL', 'CO', 'CR', 'CU', 'DO', 'EC', 'SV', 'GT', 'HN', 'MX', 'NI', 'PA', 'PY', 'PE', 'PR', 'UY', 'VE'];
        const isInLatam = latamCountries.includes(countryCode);
        setIsLatam(isInLatam);
      } catch (error) {
        console.error('Error fetching location data:', error);
      
      }
    };

    
    fetchLocationData();
  }, []); 


  useEffect(() => {   

    if(!auth.isLoggedIn){
  
      navegate('/')
     
    }
    auth.user?.role==="Tutor"&&navegate(`/tutor/${auth.user.id}`)
    const storedValue = window.localStorage.getItem("userData");
    if (storedValue) {
      const parsedUserData = JSON.parse(storedValue);
      
      setLocalUser({
        email: parsedUserData.email,
        name: parsedUserData.name,
        token: parsedUserData.token,
       
      });
    }

  
    // Effect code to run only once
  }, [auth.user?.role]);

  useEffect(() => {
    const getData = async () => {
      try {

        //consulta usuarios 
        const res = await axios( `${serverURL}/users`);   

        if (localUser.email) {
          const prueba = await axios.get(
            `${serverURL}/userdata?email=${localUser.email}`
          );
               
          let filteredData;
            if (prueba.data.goal) {             
              filteredData = res.data.filter(item => item.language === prueba.data.goal);
            } else {              
              filteredData = res.data;
            }
           
            dispatch(fetchUsers(filteredData));


          if (prueba.data.completeInfo === true) {
            dispatch(completeInfo(prueba.data.role));
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [dispatch, localUser]);

  //fucntions

  const handleLogout = () => {
    window.localStorage.removeItem("userData");
    navegate("/");
  };

 //console.log(auth)

 
 function extractNumber(priceStr) {
  if (typeof priceStr !== 'string') {
    return null;
  }
  let number = priceStr.match(/[\d.]+/);
  return number ? parseFloat(number[0]) : null;
}
 

  return (
    <Container>
      <Headings></Headings>

      <NavBar
        textBotton={"Logout"}
        onClick={handleLogout}
        userInfo={localUser}
      ></NavBar> 

      <ContainerTitle>
        <img
        
          src={Section}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          alt="section"
        />
      </ContainerTitle>
      <H3>Choose your trip</H3>

      <ContainerProfile>
        {/* {isLoading && <Spinner />} */}
        {!auth.infoComplete && !isLoading && (
          <BackgrounModal>
            <Modal title={"Complete Your Information"} url={serverURL}></Modal>
          </BackgrounModal>
        )}

      

            {users.map((user) => {
              let numericPrice = extractNumber(user.price);

              if (isInLatam === true) {
                numericPrice = numericPrice + 1;
              } else if (isInLatam === false) {
                numericPrice = numericPrice + 3;
              }

              return (
                <CardProfile
                  key={user.id}
                  name={user.name}
                  picture={user.picture}
                  price={numericPrice} 
                  language={user.language}
                  id={user.id}
                  photos={user.photos}
                  onMouseEnter={() => handleMouseEnter(user.id)} // Pasar ID de la tarjeta al entrar
                  onMouseLeave={handleMouseLeave}
                  showTinyImg={showTinyImg === user.id}
                />
              );
            })}

      </ContainerProfile>

      <br />

      <Footer></Footer>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
 
 
});

export default connect(mapStateToProps)(Home);