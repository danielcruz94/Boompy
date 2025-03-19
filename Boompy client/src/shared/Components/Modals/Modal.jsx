
import React,{useState} from 'react';
import axios from 'axios';

import { useSelector,useDispatch,connect } from "react-redux"
import {completeInfo} from '../../../Redux/authSlice'

import ImageFileUpload from '../ImageUpload/ImageFileUpdload'
import CountrySelector from '../Select/CountrySelector';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';




const Modal=({title,url,auth}) => {   
    const serverURL = useSelector(state => state.serverURL.url);
   
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
                title: '¡Tu información ha sido actualizada correctamente.',
                text: 'Ahora puedes usar la App.',
            }).then(() => {
                window.location.href = 'https://torii.com.co/home';
            });
        dispatch(completeInfo(settingInformation.role))
     
        
    } catch (error) {
        console.log(error)
    }
  }



    return (
    <div className='ContainerModal'>
            <h2 className='MainText'>{title}</h2>


        <div className='conteng-date'>
                <div className='ContainerIn-foto'>
                
                
                    <ImageFileUpload
                    id="profile_image"
                    text="Sube tu foto de perfil"
                    accept="image/png,image/jpeg"
                    name="profile_image"
                    
                    onChange={(fileUrl) =>
                        setsettingInformation({ ...settingInformation, picture: fileUrl })
                    }
                    />
                
            
                    
                </div>

                <div className='conten-select'>       
                        <div className='ContainerIn'>                        
                        <select style={{border:'1px solid #390099',backgroundColor:'white',textAlign:'center',color:'#390099',padding:'3px',borderRadius:'5px'}} onChange={handleChange} name={"country"}>
                        <option value="" >Pais</option>
                            <option value="Colombia">Colombia</option>
                            <option value="United State">United State</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Ecuador">Ecuador</option>
                            <option value="Canada">Canada</option>
                            <option value="Brasil">Brasil</option>

                        </select>
                        </div>
                        
                        <div className='ContainerIn'>                        
                        <select style={{border:'1px solid #390099',backgroundColor:'white',textAlign:'center',color:'#390099',padding:'3px',borderRadius:'5px'}} onChange={handleChange} name={"language"}>
                        <option value="" >Lenguaje Nativo</option>
                            <option value="English">Ingles</option>
                            <option value="Spanish">Español</option>
                        </select>


                        </div>

                        <div className='ContainerIn'>                            
                            <select  style={{border:'1px solid #390099',backgroundColor:'white',textAlign:'center',color:'#390099',padding:'3px',borderRadius:'5px'}} onChange={handleChange} name={"role"}>
                            <option value="" >Role</option>
                                <option  style={{color:'green'}}value="Student">Estudiante</option>
                                <option value="Tutor">Tutor</option>
                            </select>
                        
                        </div>
                        {settingInformation.role!=="Tutor" &&<div className='ContainerIn'>                       
                        <select style={{border:'1px solid #390099',backgroundColor:'white',textAlign:'center',color:'#390099',padding:'3px',borderRadius:'5px'}} onChange={handleChange} name={"goal"} >
                        <option value="" >Idioma a Aprender</option>
                            <option value="English">Ingles</option>
                            <option value="Spanish">Español</option>
                        </select>
                        </div>}

                        {settingInformation.role==="Tutor" &&<div className='ContainerIn'>                       
                        <select style={{border:'1px solid #390099',backgroundColor:'white',textAlign:'center',color:'#390099',padding:'3px',borderRadius:'5px'} } onChange={handleChange} name={"price"}>
                        <option value="" >Tarifa/hora</option>
                            <option value="3 USD">3 USD</option>
                            <option value="4 USD">4 USD</option>
                            <option value="5 USD">5 USD</option>
                            
                        </select>
                        
                        
                        </div>}
                        
                        {/* {settingRole==="Tutor" &&<div>
                        <span >Sign Up with Your</span> 
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png"  style={{width:'20px',height:'20px'}}alt="instagram" />


                            </div>} */}

            
                    
                    
                    
                    
                        
                </div>       
        </div>

        {settingInformation.role==="Tutor"? <button className="btn-modal" onClick={handleSummit} style={{height:'35px',display:'flex',alignItems:'center'}}>Finalizar</button>
            : <button className="btn-modal" onClick={handleSummit} style={{}}>Finalizar</button>}
                        



    </div>

    )
    
}
const mapStateToProps = (state) => ({
    auth: state.auth,
   
   
  });
  
  export default connect(mapStateToProps)(Modal);