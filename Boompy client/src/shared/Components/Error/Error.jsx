import React from 'react';
import ErrorImg from './Error.png';
import './Error.css'; // Asegúrate de tener el archivo CSS importado en tu proyecto

const ErrorPage = () => {
  return (
    <div className="contentError"> 
      <div>
        <h3>Error page</h3>
        <p>Home &gt; Error page</p>
      </div>
      <div className="divError">
        <img src={ErrorImg} alt="Error 404" />
        <button>Go To Home Page</button>
      </div>
    </div>
  );
}

export default ErrorPage;
