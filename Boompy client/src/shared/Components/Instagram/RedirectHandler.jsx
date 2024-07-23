import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Importa useLocation si estás usando React Router

const RedirectHandler = () => {
  const location = useLocation();

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');
    if (code) {
      exchangeCodeForAccessToken(code);
    }
  }, [location]);

  const exchangeCodeForAccessToken = (code) => {
    const clientId = 'YOUR_CLIENT_ID'; // Reemplaza con tu ID de cliente
    const clientSecret = 'YOUR_CLIENT_SECRET'; // Reemplaza con tu secreto de cliente
    const redirectUri = 'YOUR_REDIRECT_URI'; // Reemplaza con tu URL de redirección

    const tokenUrl = 'https://api.instagram.com/oauth/access_token';

    const formData = new FormData();
    formData.append('client_id', clientId);
    formData.append('client_secret', clientSecret);
    formData.append('grant_type', 'authorization_code');
    formData.append('redirect_uri', redirectUri);
    formData.append('code', code);

    fetch(tokenUrl, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      // Aquí obtienes el token de acceso y puedes comenzar a hacer solicitudes a la API de Instagram
      const accessToken = data.access_token;
      console.log('Token de acceso:', accessToken);
      // Llama a una función para usar el token de acceso, por ejemplo, obtener el perfil del usuario
      fetchUserProfile(accessToken);
    })
    .catch(error => {
      console.error('Error al intercambiar código por token de acceso:', error);
    });
  };

  const fetchUserProfile = (accessToken) => {
    // Aquí puedes hacer solicitudes a la API de Instagram con el token de acceso
    // Por ejemplo, obtener el perfil del usuario
  };

  return <div>Procesando autorización...</div>;
};

export default RedirectHandler;
