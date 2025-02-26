// WebRTCManager.jsx
import Peer from 'peerjs';

let userId; 

const setUserId = (userIdParam) => {
    userId = userIdParam;
};

const initializePeer = () => {
    if (!userId) {
       // console.error('Error: No se ha establecido el ID de usuario.');
        return null;
    }

    const peer = new Peer(userId);

    peer.on('open', (id) => {
        //console.log('Conexión exitosa. ID de Peer:', id);
    });

    peer.on('error', (error) => {
       // console.error('Error en la conexión:', error);
    });

    return peer;
};

export { setUserId, initializePeer };
