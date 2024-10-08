import styled from 'styled-components';
import { color } from '../shared/styles';

export const Container = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction:column;
  min-height: 800px;
 

  
`;
export const ContainerBar = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  margin: 10px 0px;
  justify-content:space-around;
  align-items:center;

@media (max-width: 600px) {
  flex-direction: column;
  padding: 10px 0px;
}


  

  
`;


export const ContainerPicture = styled.div`
// background:purple;

  width:100vw;
  height:200px;

`;
export const Headings = styled.div`
  
  width:100vw;
  height:50px;
  background:${color.primary}
`;

export const Bottom = styled.button`

  background:${color.buttons};
  display: flex;
  justify-content: center;
  align-items: center;
  border-Radius:50px;
  color:black;
`;



export const ContainerTitle = styled.div`
width:100vw;
  height: 200px;
  background:#faeffa;
  margin-top:10px;
  display:flex;
 background-color: transparent;
  
  justify-content:flex-start;

  @media (max-width: 500px) {
    justify-content:center;
    align-items:center;
    height:100px;
}
 
 


`;

export const FormContainer = styled.div`
  margin-bottom: 20px;
  
`;

export const ContainerNavBar = styled.div`
display:flex;
border-Radius:50px;
border:1px solid #D3D2DF;
width:400px;
height:35px;
justify-content:center;
align-items:center;

@media (max-width: 600px) {
  width: 95%;

  margin: 10px 0px;
}

`;

export const SubmitButton = styled.input`
  display: inline-block;
  height:26px;
  margin-left:10px;
  margin-right:10px;
  text-align: center;
  cursor: pointer;
  border:none;
  color: ${color.primary};
  width: 200px;
  background: white;
  color:black;
  top: 0;

  @media (max-width: 600px) {
    width: 50%;
  }

  &:active {
    position: relative;
    outline: none;
    top: 5px;
    box-shadow: none;
    
  }
`;


export const Image = styled.div`
  height: 70%;
  background-color: transparent;
  background-size: cover;
  // background-position: center;
  background-repeat: no-repeat;
`;





export const MainHeading = styled.p`
  font-size: 34px;
  font-weight: 600;
  line-height: 1.6;
  color: ${color.textDarkest};
  margin-bottom: 14px;

  @media (max-width: 1100px) {
    font-size: 28px;
  }
`;

export const SubHeading = styled.p`
  font-size: 18px;

 margin-left:15px;
  

  @media (min-width: 1100px) {
    
  }
`;

export const BackgrounModal = styled.div`
background-color: rgba(0, 0, 0, 0.5); /* Gris semitransparente */
display:flex;
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
justify-content:center;
align-items:center;
z-index: 1;
`;



export const inputBio = styled.input`
display: inline-block;
width:100%;
background:red;


  

  @media (max-width: 1100px) {
    font-size: 16px;
  }
`;

export const TextArea = styled.textarea`
  display: inline-block;
  max-width: 100%;  
  word-wrap: break-word;

height:270px;




  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #f2f2f2;
  }

  @media (max-width: 500px) {
 height: 200px;
  }
`;

export const H3 = styled.h3`

position:relative;
top:-150px;
left:-300px;
color:#161439;

  @media (max-width: 600px) {
    top:-70px;
    left:-50px;
  }
`;

export const H4 = styled.h4`
background-color:#161439;
padding:10px;
padding-Left:25px;
padding-Right:25px;
border-Radius:50px;
font-size:15px;

  @media (max-width: 600px) {
   
  }
`;











