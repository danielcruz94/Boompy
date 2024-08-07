import styled, { css } from 'styled-components';
import { color } from '../../styles';

export const Container = styled.div`
margin:7px;
  [type='file'] {
    display: none;
  }

  .inner-container {
    position: relative;
  }
`;

export const Label = styled.label`
  color: ${(props) =>
    props.isLoading ? color.textVeryLight : color.textMedium};
  cursor: pointer;
  display: inline-block;
  font-weight: 500;
  font-size: 14px;
  border-radius: 3px;
  padding: 10px 12px;
  background: white;


  & > i {
    margin-right: 4px;
  }

  &:hover {
    background-color: rgb(240 240 245);
  }
`;

export const Description = styled.p`
  font-weight: 500;
  line-height: 20px;
  font-size: 12px;
  color: ${color.textLight};
`;

export const Spinner = styled.div`
  display: inline-block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -30px;

  & > img {
    vertical-align: middle;
  }
`;


export const UpPhotos = styled.div`
cursor: pointer;
display: inline-block;
color: ${(props) =>
    props.isLoading ? color.textVeryLight : color.textMedium};




 
`;

