import styled from 'styled-components';


export const Container = styled.div`
width: 100%;
display: flex;
justify-content:space-around;
//align-items:center;
background:#06042E;

  


  
`;

export const ContainerText = styled.div`
width: 100%;
display: flex;
margin:50px 50px 50px 50px;
align-items:center;

justify-content:space-around;
@media (max-width: 500px) {
    margin:20px 10px 10px 5px;
    
 }

  
`;

export const Columns = styled.div`

display: flex;
flex-direction:column;
align-items:start;

@media (max-width: 500px) {
   width:100%;
   margin:10px;
   align-items:center;
 
  
   
   
   
}




  
`;

export const ContenedorImg = styled.div`

display: flex;
gap:20px;
margin:20px;
@media (max-width: 500px) {
   
   gap:15px;
   

    
    
  
}



  
`;




export const LinkFooter = styled.li`
color:white;

@media (max-width: 500px) {
    font-Size:10px; 
   
}






  
`;

export const Span = styled.span`

color:white;

@media (max-width: 500px) {
    font-Size:10px; 

   
}






  
`;









