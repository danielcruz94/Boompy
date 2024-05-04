import React, { useState } from 'react';
import { peer } from './WebRTCManager';

const LlamadaComponent = ({ setIsCameraOn }) => {
    const [idDestino, setIdDestino] = useState('');

    const iniciarLlamada = async () => {
        try {
            // Cambiar isCameraOn a true
            setIsCameraOn(true);

            const constraints = {
                audio: true,
                video: true,
            };

            // Obtener el stream local (por ejemplo, del dispositivo de usuario)
            const stream = await navigator.mediaDevices.getUserMedia(constraints);

            // Llamar al peer destino
            const call = peer.call(idDestino, stream);

            // Manejar cualquier error
            call.on('error', error => {
                console.error('Error al realizar la llamada:', error);
            });
        } catch (error) {
            console.error('Error al acceder a la cámara o al micrófono:', error);
        }
    };

    const handleIdDestinoChange = event => {
        setIdDestino(event.target.value);
    };

    return (
        <div>
            <input type="text" value={idDestino} onChange={handleIdDestinoChange} placeholder="ID del destino" />
            <button onClick={iniciarLlamada}>Realizar Llamada</button>
        </div>
    );
};

export default LlamadaComponent;
