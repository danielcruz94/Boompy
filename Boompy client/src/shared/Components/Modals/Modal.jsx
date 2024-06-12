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
    picture:""

    
});







const handleChange = (event) => {
    const { name, value } = event.target;
    setsettingInformation({ ...settingInformation, [name]: value });
  };

  const handleSummit =async(e) => {
  

    try {
        e.preventDefault();

        const email =auth.user.email;
        const dataToSend = {
            email, // Add email to the data
            ...settingInformation,
          };
          
          console.log(serverURL)
          
    
        const sendInfo = await axios.post(
            `${serverURL}/userinformation`,dataToSend );

          alert("se actualizo la info")
        dispatch(completeInfo())
        // setIsVisible(false)

        
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
               <Span >Choose Your Native Language</Span>
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


            <Button onClick={handleSummit}>Finish</Button>



           
           
           
         
            
           

    </Container>

    )
    
}

export default Modal;