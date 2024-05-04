// En el archivo WebRTCManager.js
import Peer from 'peerjs';

// Función para inicializar y configurar el objeto peer
const initializePeer = () => {
    // Aquí puedes agregar cualquier configuración necesaria para PeerJS
    const peer = new Peer({
        // Puedes proporcionar opciones como la clave de la API, configuraciones de ICE, etc.
    });

    // Manejar eventos de conexión exitosa y fallida
    peer.on('open', (id) => {
        console.log('Conexión exitosa. ID de Peer:', id);
    });

    peer.on('error', (error) => {
        console.error('Error en la conexión:', error);
    });

    // Manejar llamada entrante
    peer.on('call', call => {
        // Responder automáticamente a la llamada entrante
        call.answer();
        // Establecer el flujo de medios para el video entrante
        call.on('stream', stream => {
            // Manejar el stream entrante, por ejemplo, mostrarlo en un elemento de video
        });
    });

    return peer;
};

// Exportar el objeto peer configurado
export const peer = initializePeer();
