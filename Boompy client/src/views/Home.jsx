
import  {useEffect,React,useState}from "react"
import NavBar from '../shared/NavBar/NavBar'
import StudentCalendar from '../shared/Components/Calendar/Student_Calendar';

import CardProfile from "../shared/Components/Cards/CardProfile"
import { useSelector,useDispatch,connect } from "react-redux"
import axios from 'axios'
import {fetchUsers} from '../Redux/usersSlice'
import Modal from "../shared/Components/Modals/Modal"
import { useNavigate} from 'react-router-dom';
import {login,completeInfo} from '../Redux/authSlice'
import Spinner from "../../src/shared/Components/Modals/Spinners/Spinner";
import ChatSupport from "../shared/ChatSupport/ChatSupport";
      
      


const Home = ({auth}) => {

  
  const users = useSelector((state) => state.users);
  // const auth = useSelector((state) => state.auth);
  const serverURL = useSelector(state => state.serverURL.url);
  
  const [location, setLocation] = useState('');
  const [isInLatam, setIsLatam] = useState(false);
  
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const dispatch = useDispatch();
  const navegate = useNavigate();

  //locals Variable
  useEffect(() => {
    const img = new Image();
    img.src = "/home/fondo 1.jpeg";
    img.onload = () => setIsLoading(false);
  }, []);

  const CalendarComponent = StudentCalendar;  

  const [isLoading, setIsLoading] = useState(true); // Estado de carga inicial
  const [isLoading1, setIsLoading1] = useState(true)
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

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  

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
           
           
            dispatch(fetchUsers((shuffleArray(filteredData))));
           

          if (prueba.data.completeInfo === true) {
            dispatch(completeInfo(prueba.data.role));
           
          }
          setIsLoading1(false)
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



 
 function extractNumber(priceStr) {  
  if (typeof priceStr !== 'string') {
    return null;
  }
  let number = priceStr.match(/[\d.]+/);
  return number ? parseFloat(number[0]) : null;
}

const toggleCalendar = () => {
  setIsCalendarOpen(!isCalendarOpen);
};

const closeCalendar = () => {
  setIsCalendarOpen(false);
};


return (

  isLoading?<Spinner />:
  <div className="conten-home">

      {/* Barra de navegación */}
      <NavBar
          textBotton={"Cerrar"}
          onClick={handleLogout}
          userInfo={localUser}
        ></NavBar>
      
      

    {!auth.infoComplete && !isLoading1 ? (
      <div className="conten-home-modal">
        <Modal title={"Completa tu información"} url={serverURL}></Modal>
      </div>
    ) : (
      <>       

        {/* Contenedor de perfiles */}
        <div className="ContainerProfile">
          {/* {isLoading && <Spinner />} */}
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
                onMouseEnter={() => handleMouseEnter(user.id)}
                onMouseLeave={handleMouseLeave}
                // showTinyImg={showTinyImg === user.id}
              />
            );
          })}
        </div>
    

        <br />

        {/* Calendario */}
        {isCalendarOpen && (
          <CalendarComponent
            isOpen={isCalendarOpen}
            onRequestClose={closeCalendar}
            onClose={closeCalendar}
          />
        )}

<div className="calendarioclases">
        <p
          className="CalendarHome"
          onClick={toggleCalendar}
          style={{ cursor: "pointer", fontWeight: "bold" }}
        >
          Calendario
        </p>
        <ChatSupport></ChatSupport>

</div>
      </>
    )}
 
  </div>
);

};

const mapStateToProps = (state) => ({
  auth: state.auth,
 
 
});

export default connect(mapStateToProps)(Home);