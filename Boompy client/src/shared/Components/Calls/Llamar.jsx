import React, { useState, useEffect } from 'react';
import { peer } from './WebRTCManager';

const LlamadaComponent = ({ isCameraOn, setIsCameraOn }) => {
    const [idDestino, setIdDestino] = useState('');
    const [stream, setStream] = useState(null);
    const [llamadaRealizada, setLlamadaRealizada] = useState(false);

    const iniciarLlamada = async () => {
        try {
            // Cambiar isCameraOn a true
            setIsCameraOn(true);

            const constraints = {
                audio: true,
                video: true,
            };

            // Obtener el stream local (por ejemplo, del dispositivo de usuario)
            const newStream = await navigator.mediaDevices.getUserMedia(constraints);

            // Verificar si el stream se obtuvo correctamente
            if (newStream) {
                console.log('Stream local obtenido correctamente:', newStream);
                setStream(newStream);
                setLlamadaRealizada(true); // Marcar la llamada como realizada
            } else {
                console.error('No se pudo obtener el stream local.');
            }

            // Llamar al peer destino solo si la llamada aún no se ha realizado
            if (!llamadaRealizada) {
                const call = peer.call(idDestino, newStream);

                // Manejar cualquier error
                call.on('error', error => {
                    console.error('Error al realizar la llamada:', error);
                });
            }
        } catch (error) {
            console.error('Error al acceder a la cámara o al micrófono:', error);
        }
    };

    const handleIdDestinoChange = event => {
        setIdDestino(event.target.value);
    };

    // Cambiar el estado de la cámara cuando setIsCameraOn cambia
    useEffect(() => {
        console.log('Stream:', stream);
        
        const toggleCameraState = async () => {
            if (stream) {
                const tracks = stream.getTracks();
                tracks.forEach(track => {
                    if (track.kind === 'video') {
                        // Apagar o encender el track de video según el valor de isCameraOn
                        track.enabled = isCameraOn;
                        console.log('Estado del track de video después del cambio:', track.enabled);
                    }
                });
            }
        };
        toggleCameraState();
    }, [isCameraOn, stream]); // Agregar stream como una dependencia del useEffect
    

    return (
        <div>
            <input type="text" value={idDestino} onChange={handleIdDestinoChange} placeholder="ID del destino" />
            <button onClick={iniciarLlamada}>Realizar Llamada</button>
        </div>
    );
};

export default LlamadaComponent;
