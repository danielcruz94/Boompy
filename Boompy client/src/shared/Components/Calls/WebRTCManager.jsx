// WebRTCManager.jsx
import Peer from 'peerjs';

const peer = new Peer();

peer.on('open', (id) => {
    console.log('Conexión exitosa. ID de Peer:', id);
});

peer.on('error', (error) => {
    console.error('Error en la conexión:', error);
});

export default peer;
