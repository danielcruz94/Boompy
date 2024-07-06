
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
import Spinner  from "../shared/Components/Modals/Spinners/Spinner"
import  {loadUser} from "./../Redux/authSlice"
      
      


const Home = ({auth}) => {
  const users = useSelector((state) => state.users);
  // const auth = useSelector((state) => state.auth);
  const serverURL = useSelector(state => state.serverURL.url);

  const dispatch = useDispatch();
  const navegate = useNavigate();

  //locals Variable

  

  const [isLoading, setIsLoading] = useState(true); // Estado de carga inicial

  const [localUser, setLocalUser] = useState({
    email: "",
    token: "",
    name: "",
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
    ; // Reinicia al salir del mouse
  };




  useEffect(() => {
    if(!auth.isLoggedIn){
      navegate('/')
     
    }

    const storedValue = window.localStorage.getItem("userData");
    if (storedValue) {
      const parsedUserData = JSON.parse(storedValue);

      setLocalUser({
        email: parsedUserData.email,
        name: parsedUserData.name,
        token: parsedUserData.token,
       
      });
    }

    auth.user?.role==="Tutor"&&navegate(`/tutor/${auth.user.id}`)
    // Effect code to run only once
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {

        const res = await axios( `${serverURL}/users`);

        dispatch(fetchUsers(res.data));

        if (localUser.email) {
          const prueba = await axios.get(

            `${serverURL}/userdata?email=${localUser.email}`

          );

          if (prueba.data.completeInfo === true) {
            dispatch(completeInfo());
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
      <H3>Choose your Trip</H3>

      <ContainerProfile>
        {/* {isLoading && <Spinner />} */}
        {!auth.infoComplete && !isLoading && (
          <BackgrounModal>
            <Modal title={"Complete Your Information"} url={serverURL}></Modal>
          </BackgrounModal>
        )}

        {users.map((user) => (
          <CardProfile
            key={user.id}
            name={user.name}
            picture={user.picture}
            price={user.price}
            goal={user.goal}
            id={user.id}
            photos={user.photos}
            onMouseEnter={() => handleMouseEnter(user.id)} // Pasar ID de la tarjeta al entrar
            onMouseLeave={handleMouseLeave}
            showTinyImg={showTinyImg === user.id}
          ></CardProfile>
        ))}
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