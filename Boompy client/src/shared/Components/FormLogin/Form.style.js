import styled from 'styled-components';
import { color } from '../../styles';

export const FormLog = styled.form`
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction:column;
  min-height: 300px;
  background:#F7F7FA;
  margin 0 auto;
  margin-top:10px;
  border:1px solid #E1E1E1;
  border-radius:5px;
  margin-botton:70px;

  @media (max-width: 500px) {
    width: 360px;
    
}
  
`;

export const GoogleButton = styled.button`
  color: black;
  width: 420px;
  height: 30px;
  background:#FFFFFF;
  margin 0 auto;
  display:flex;
  justify-content:center;
  margin-top:30px;
  align-items:center;
  border:1px solid #E1E1E1;
  @media (max-width: 500px) {
    width: 300px;
    
}

  
`;

export const Container = styled.div`
  margin:0 auto;
  width:420px;
  height: 100%;
  display: flex;

  flex-direction:column;

  @media (max-width: 500px) {
    width: 300px;
    
}

 

  

  
`;


export const Span=styled.span`
  font-size:13px;
  color:#6D6C80;
  text-align:initial;
  



 

  

  
`;

export const Input=styled.input`
  background:#FFFFFF;
  height: 30px;
  text-align:initial;
  border:1px solid #E1E1E1;
  border-radius:5px;
  color: black;
 



 

  

  
`;

export const TextLogin=styled.p`

  text-align:initial;
  font-weight: 600; 
  margin:2px;
 
  
 


 

  

  
`;

export const ContenedorRemember=styled.div`
display:flex;
justify-content:space-evenly;
 background: white;
  



 

  

  
`;



