import React from 'react';
import './Calls.css'; // Assuming you have a CSS file named Calls.css for styling

const Calls = () => {
    return (
        <div className="ContenCall"> 
            <div className="contenPantalla">
                <div className="Video">
                    <img src="https://c8.alamy.com/compes/2jd9dxc/businessman-lleva-el-auricular-saluda-al-cliente-inicia-la-comunicacion-por-videoconferencia-2jd9dxc.jpg" alt="Imagen de fondo" className="imgcall" />
                </div>
                <div className="InfoCall">
                    <div className="DivCall"> 
                        <img src="https://c8.alamy.com/compes/2jd9dxc/businessman-lleva-el-auricular-saluda-al-cliente-inicia-la-comunicacion-por-videoconferencia-2jd9dxc.jpg" alt="Imagen de fondo" className="imgcall" />
                    </div>
                    <div className="DivUser">
                        <img src="https://c8.alamy.com/compes/2jd9dxc/businessman-lleva-el-auricular-saluda-al-cliente-inicia-la-comunicacion-por-videoconferencia-2jd9dxc.jpg" alt="Imagen de fondo" className="imgcall" />
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="video-call-icons">
                    <div className="icon-wrapper">
                        <i className="fas fa-microphone"></i>
                    </div>
                    <div className="icon-wrapper">
                        <i className="fas fa-phone-slash"></i>
                    </div>
                    <div className="icon-wrapper">
                        <i className="fas fa-volume-up"></i>
                    </div>
                    <div className="icon-wrapper">
                        <i className="fas fa-video"></i>
                    </div>
                    <div className="icon-wrapper">
                        <i className="fas fa-expand"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calls;
