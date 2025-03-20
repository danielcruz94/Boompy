import styled from 'styled-components';




export const TextArea = styled.textarea`
width: 100%;
min-height: 90px; /* Altura inicial */
max-height: 100px; /* Altura máxima */
padding-left: 10px;
padding-right:10px;
padding-top:10px;
padding-button:10px;
margin-top:5px;
font-size: 16px;
font-family: "Arial", sans-serif;

border-radius: 10px;
outline: none;
transition: all 0.3s ease-in-out;


resize: none; /* Evita que el usuario cambie el tamaño manualmente */
overflow: hidden; /* Evita barras de desplazamiento innecesarias */

&:focus {
  border-color: red;
  box-shadow: 0 0 10px red;
  background-color: #fff;
}
`;



