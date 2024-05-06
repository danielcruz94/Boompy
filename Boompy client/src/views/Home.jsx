
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


const Home=() => {
  const users=useSelector((state)=>state.users);
  const dispatch=useDispatch();
  const navegate =useNavigate()

//locals Variable

const [access,setAccess]=useState(false);
const [isComplete,setIsComplete]=useState(false)


//useEffects

// useEffect(() => {
//   !access && navegate('/');



// }, [access]);


useEffect(()=>{
  const loggedUserJSON=window.localStorage.getItem('loggedAppUser')
  if(loggedUserJSON){
   const user=JSON.parse(loggedUserJSON);
   setIsComplete(user.completeInfo)
  }
 },[isComplete])




  useEffect(()=>{
    const getData=async()=>{
      try {
        const res= await axios('http://localhost:3001/api/users')
        dispatch(fetchUsers(res.data))
      
      } catch (error) {
        console.log(error)
        
      }
    }
    getData()


  },[dispatch]);



  //fucntions
  
  const handleLogout=() => {
   
    window.localStorage.removeItem('loggedAppUser');
    navegate("/");
    
     
  }
  
  

  
 
  
  
    return (
   
    <Container>
    <Headings>
    </Headings>
    <NavBar textBotton={"Logout"} onClick={handleLogout}>

    </NavBar>
    <ContainerTitle>
            <img src={Section}  style={{width:'100%'}}alt="section" />
            <h3 style={{fontSize:'30px',position:'relative',top:'-200px',left:'-400px'}}>Choose your Trip</h3>
        </ContainerTitle>

    <ContainerProfile>
    {!isComplete&&<Modal title={"Complete Your Information"} ></Modal>}
    
    
   
    {users.map((user) => <CardProfile id={user.id}name={user.name} picture={user.picture}></CardProfile>)}
    
    
    </ContainerProfile>

    <br />
   
  <Footer>

  </Footer>
    
 



    </Container>
    
    
    )
}

export default Home;