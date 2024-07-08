import {Container,
    MainText,
    UploadPicture,
    ContainerIn,
    Span,
    Img,
    Button
} from './Modal.style'
import React,{useState} from 'react';
import axios from 'axios';

import { useSelector,useDispatch } from "react-redux"
import {completeInfo} from '../../../Redux/authSlice'

import ImageFileUpload from '../ImageUpload/ImageFileUpdload'
import CountrySelector from '../Select/CountrySelector';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { logout } from '../../../Redux/authSlice';



const Modal=({title,url}) => {   
    const serverURL = useSelector(state => state.serverURL.url);
    const auth=useSelector((state)=>state.auth);
    const dispatch=useDispatch();

    const roles=[{value:'student',label:"Student"},
    {value:'tutor',label:"Tutor"}];

    const lenguages=[
        {value:'spanish',label:"Spanish"},
        {value:'english',label:"English"}
]







const [settingInformation,setsettingInformation]=useState({
    role:"",
    language:"",
    goal:"",
    price:"",
    instagram:"",
    country:""
   

    
});







const handleChange = (event) => {
    const { name, value } = event.target;
    setsettingInformation({ ...settingInformation, [name]: value });
    console.log(settingInformation)
  };

  const handleSummit =async(e) => {
  

    try {
        e.preventDefault();

        const email =auth.user.email;
        const dataToSend = {
            email, // Add email to the data
            ...settingInformation,
          };
          
          
          
    
        const sendInfo = await axios.post(
            `${serverURL}/userinformation`,dataToSend );

            Swal.fire({
                icon: 'success',
                title: '¡Infomación completa!',
                text: 'Ahora puedes usar la app para practicar.',
            }).then()
        dispatch(completeInfo())
        // setIsVisible(false)
        dispatch(logout())

        
    } catch (error) {
        console.log(error)
    }
  }



    return (
        <Container>
            <MainText>{title}</MainText>
            <ContainerIn>
                <Span>Upload Your Picture</Span>
               
                  <ImageFileUpload
                   id="profile_image"
                   text="Profile Photo"
                   accept="image/png,image/jpeg"
                   name="profile_image"
                   
                   onChange={(fileUrl) =>
                    setsettingInformation({ ...settingInformation, picture: fileUrl })
                   }
                   />
               
           
                
            </ContainerIn>
            <ContainerIn>
            <Span >Country</Span>
            <select style={{border:'1px solid #390099',backgroundColor:'white',textAlign:'center',color:'#390099',padding:'3px',borderRadius:'5px'}} onChange={handleChange} name={"country"}>
            <option value="" >Select an option</option>
                <option value="Colombia">Colombia</option>
                <option value="United State">United State</option>
                <option value="Argentina">Argentina</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Canada">Canada</option>
                <option value="Brasil">Brasil</option>

            </select>
            </ContainerIn>
            
            <ContainerIn>
               <Span >Native Language</Span>
            <select style={{border:'1px solid #390099',backgroundColor:'white',textAlign:'center',color:'#390099',padding:'3px',borderRadius:'5px'}} onChange={handleChange} name={"language"}>
            <option value="" >Select an option</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
            </select>


            </ContainerIn>

            <ContainerIn>
                <Span>Role</Span>
                <select  style={{border:'1px solid #390099',backgroundColor:'white',textAlign:'center',color:'#390099',padding:'3px',borderRadius:'5px'}} onChange={handleChange} name={"role"}>
                <option value="" >Select an option</option>
                    <option  style={{color:'green'}}value="Student">Student</option>
                    <option value="Tutor">Tutor</option>
                </select>
              
            </ContainerIn>
             <ContainerIn>
            <Span >Goal</Span> 
            <select style={{border:'1px solid #390099',backgroundColor:'white',textAlign:'center',color:'#390099',padding:'3px',borderRadius:'5px'}} onChange={handleChange} name={"goal"} >
            <option value="" >Select an option</option>
                <option value="English">🇺🇸</option>
                <option value="Spanish">🇪🇸</option>
            </select>
            </ContainerIn>

            {settingInformation.role==="Tutor" &&<ContainerIn>
            <Span >Rate/hour</Span> 
            <select style={{border:'1px solid #390099',backgroundColor:'white',textAlign:'center',color:'#390099',padding:'3px',borderRadius:'5px'} } onChange={handleChange} name={"price"}>
            <option value="" >Select an option</option>
                <option value="5 USD">5 USD</option>
                <option value="6 USD">6 USD</option>
                <option value="7 USD">7 USD</option>
                <option value="10 USD">10 USD</option>
            </select>
            
            
            </ContainerIn>}
            
            {/* {settingRole==="Tutor" &&<ContainerIn>
            <span >Sign Up with Your</span> 
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png"  style={{width:'20px',height:'20px'}}alt="instagram" />


                </ContainerIn>} */}

{settingInformation.role==="Tutor"? <Button onClick={handleSummit} style={{height:'35px',display:'flex',alignItems:'center'}}>Finish</Button>
 : <Button onClick={handleSummit} style={{}}>Finish</Button>}
            



           
           
           
         
            
           

    </Container>

    )
    
}

export default Modal;