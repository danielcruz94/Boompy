
import  {useEffect,React,useState}from "react"
import {Container,Headings,ContainerTitle} from './Landing.style'
import {ContainerProfile} from '../shared/Components/Cards/Cards.style'
import NavBar from '../shared/NavBar/NavBar'
import Section from '../../../imagenes/Section.svg'
import Form from '../shared/Components/FormLogin/Form'
import Footer from '../shared/Components/Footer/Footer'
import CardProfile from "../shared/Components/Cards/CardProfile"
import { useSelector,useDispatch } from "react-redux"
import axios from 'axios'
import {fetchUsers} from '../Redux/usersSlice'
import Modal from "../shared/Components/Modals/Modal"
import { useNavigate} from 'react-router-dom';
import {login,completeInfo} from '../Redux/authSlice'

import Loader from "../shared/Components/Loader/Loader"

const Home = () => {
  const users = useSelector((state) => state.users);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navegate = useNavigate();

  //locals Variable

  const [isLoading, setIsLoading] = useState(true); // Estado de carga inicial

  const [localUser, setLocalUser] = useState({
    email: "",
    token: "",
    name: "",
  });

  //

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios("http://localhost:3001/api/users");
        dispatch(fetchUsers(res.data));

        if (localUser.email) {
          const prueba = await axios.get(
            `http://localhost:3001/api/userdata?email=${localUser.email}`
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
        <img src={Section} style={{ width: "100%" }} alt="section" />
        <h3
          style={{
            fontSize: "30px",
            position: "relative",
            top: "-200px",
            left: "-400px",
          }}
        >
          Choose your Trip
        </h3>
      </ContainerTitle>

      <ContainerProfile>
        {isLoading && <Loader />}
        {!auth.infoComplete && !isLoading && (
          <Modal title={"Complete Your Information"}></Modal>
        )}
       
        {users.map((user) => (
          <CardProfile
            key={user.id}
            name={user.name}
            picture={user.picture}
            price={user.price}
            goal={user.goal}
            id={user.id}
          ></CardProfile>
        ))}

      </ContainerProfile>

      <br />

      <Footer></Footer>
    </Container>
  );
};

export default Home;