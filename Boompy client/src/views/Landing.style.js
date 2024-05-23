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
`;



export const ContainerTitle = styled.div`
width:100vw;
  height: 200px;
  background:#faeffa;
  margin-top:10px;
  display:flex;
 
  
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
  

  @media (max-width: 1100px) {
    font-size: 16px;
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








