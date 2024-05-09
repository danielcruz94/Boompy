
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


const Home=() => {
  const users=useSelector((state)=>state.users);
  const auth=useSelector((state)=>state.auth);

  const dispatch=useDispatch();
  const navegate =useNavigate()

//locals Variable


const [localUser,setLocalUser]=useState({
  email:"",
  token:"",
  name:""})


// 

//useEffects









useEffect(()=>{
  
  const loggedUserJSON=window.localStorage.getItem('loggedAppUser')
  if(loggedUserJSON){
   const user=JSON.parse(loggedUserJSON);
   setLocalUser({email:user.email,
    token:user.token,
    name:user.name})

   
   
 

    


  
  
  }
 },[dispatch])



// useEffect(() => { 
  
//   !access && navegate('/');



// }, [access]);


console.log(auth)












  useEffect(()=>{
    const getData=async()=>{
      try {
        const res= await axios('http://localhost:3001/api/users')
        dispatch(fetchUsers(res.data))
     
        const activeUser=res.data.filter((usuario) =>usuario.email==="daniel94cruz@gmail.com")
        console.log(activeUser)
        if(activeUser[0]?.completeInfo===true){
          dispatch(completeInfo())
        }
        
        
     
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
    <NavBar textBotton={"Logout"} onClick={handleLogout} userInfo={localUser}>

    </NavBar>
    <ContainerTitle>
            <img src={Section}  style={{width:'100%'}}alt="section" />
            <h3 style={{fontSize:'30px',position:'relative',top:'-200px',left:'-400px'}}>Choose your Trip</h3>
        </ContainerTitle>

    <ContainerProfile>
    {!auth.infoComplete&&<Modal title={"Complete Your Information"} ></Modal>}
    
    
   
    {users.map((user) => <CardProfile key={user.id}name={user.name} picture={user.picture} price={user.price} goal={user.goal}></CardProfile>)}
    
    
    </ContainerProfile>

    <br />
   
  <Footer>

  </Footer>
    
 



    </Container>
    
    
    )
}

export default Home;