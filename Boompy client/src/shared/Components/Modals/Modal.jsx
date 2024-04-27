import {Container,
    MainText,
    UploadPicture,
    ContainerIn,
    Span
} from './Modal.style'
import React from 'react';
import Select from 'react-select';
import DropDown from '../DropDown/DropDown';




const Modal=({title}) => {

    const lenguages=[
        {value:'spanish',label:"Spanish"},
        {value:'english',label:"English"}
];
    return (
        <Container>
            <MainText>{title}</MainText>
            <ContainerIn>
                <Span>Upload Your Picture</Span>
           
                
            </ContainerIn>
            <ContainerIn>
               <Span >Choose Your Native Language</Span>
              <Select options={lenguages}/>

            </ContainerIn>

            <ContainerIn>
                <Span>Role</Span>
                <b><span>Student</span></b>
            </ContainerIn>
           
           
         
            
           

    </Container>

    )
    
}

export default Modal;