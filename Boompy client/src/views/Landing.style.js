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

justify-content:space-around;
 

  

  
`;

export const Headings = styled.div`
  
  width:100vw;
  height:50px;
  background:${color.primary}
`;

export const Left = styled.div`
  width: 50%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

 
`;

export const Right = styled.div`
  width: 50%;
  height: 100%;
  border-left: 2px solid ${color.borderLightest};
  display: flex;
  flex-direction: column;


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


`;

export const SubmitButton = styled.input`
  display: inline-block;
  height:26px;
margin-left:10px;
  text-align: center;
  cursor: pointer;
  border:none;
  color: ${color.primary};
  width: 200px;
 
  top: 0;

  &:active {
    position: relative;
    outline: none;
    top: 5px;
    box-shadow: none;
  }
`;

export const Logo = styled.p`
  margin-top: 60px;
  margin-bottom: 96px;
  display: flex;
  align-items: center;
  justify-content: center;

  & > i {
    margin-right: 7px;
    color: ${color.primary};
  }

  & > span {
    font-weight: 700;
    font-size: 22px;
    color: ${color.primary};
  }

 
`;



export const Image = styled.div`
  height: 70%;

  background-size: cover;
  // background-position: center;
  background-repeat: no-repeat;
`;

export const Bottom = styled.div`
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
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

  margin:10px;
  

  @media (max-width: 1100px) {
    font-size: 16px;
  }
`;


