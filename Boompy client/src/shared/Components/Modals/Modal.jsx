import {Container,
    MainText,
    UploadPicture,
    ContainerIn,
    Span,
    Img,
    Button
} from './Modal.style'
import React,{useState} from 'react';







const Modal=({title}) => {

    const role=[{value:'student',label:"Student"},
    {value:'tutor',label:"Tutor"}];

    const lenguages=[
        {value:'spanish',label:"Spanish"},
        {value:'english',label:"English"}
]

const [settingRole,setSettingRole]=useState("");


const handleSelect=()=>{
    setSettingRole()

}

    return (
        <Container>
            <MainText>{title}</MainText>
            <ContainerIn>
                <Span>Upload Your Picture</Span>
                <div style={{width:'30px',height:'30px',border:'1px solid #390099',borderRadius:'10%'}}>
                    <Img src="https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" alt="imgDefault" />
                </div>
           
                
            </ContainerIn>
            <ContainerIn>
               <Span >Choose Your Native Language</Span>
            <select style={{border:'1px solid #390099',backgroundColor:'white',textAlign:'center',color:'#390099',padding:'3px',borderRadius:'5px'}}>
            <option value="" disabled>Select an option</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
            </select>

            </ContainerIn>

            <ContainerIn>
                <Span>Role</Span>
                <select value={settingRole}  style={{border:'1px solid #390099',backgroundColor:'white',textAlign:'center',color:'#390099',padding:'3px',borderRadius:'5px'}} onChange={(event) => setSettingRole(event.target.value)}>
                   
                    <option  style={{color:'green'}}value="Student">Student</option>
                    <option value="Tutor">Tutor</option>
                </select>
              
            </ContainerIn>
            {settingRole==="Student"? <ContainerIn>
            <Span >Goal</Span> 
            <select style={{border:'1px solid #390099',backgroundColor:'white',textAlign:'center',color:'#390099',padding:'3px',borderRadius:'5px'}}>
                <option value="English">🇺🇸</option>
                <option value="Spanish">🇪🇸</option>
            </select>
            </ContainerIn>:""}

            {settingRole==="Tutor" &&<ContainerIn>
            <Span >Rate/hour</Span> 
            <select style={{border:'1px solid #390099',backgroundColor:'white',textAlign:'center',color:'#390099',padding:'3px',borderRadius:'5px'}}>
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


            <Button>Finish</Button>



           
           
           
         
            
           

    </Container>

    )
    
}

export default Modal;