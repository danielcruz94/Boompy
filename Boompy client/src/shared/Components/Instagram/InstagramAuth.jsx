import React from 'react';

const InstagramAuth = () => {
  const clientId = 'YOUR_CLIENT_ID'; // Reemplaza con tu ID de cliente
  const redirectUri = 'YOUR_REDIRECT_URI'; // Reemplaza con tu URL de redirección
  const scope = 'user_profile,user_media'; // Permisos que solicitas
  const responseType = 'code'; // Tipo de respuesta

  const handleLogin = () => {
    window.location.href = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;
  };

  return (
    <div>
      <h2>Inicio de sesión con Instagram</h2>
      <button onClick={handleLogin}>Iniciar sesión con Instagram</button>
    </div>
  );
};

export default InstagramAuth;
