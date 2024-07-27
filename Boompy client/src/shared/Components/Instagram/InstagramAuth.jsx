import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const InstagramAuthUnified = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const location = useLocation();

  const clientId = '1320840705542274'; // Reemplaza con tu ID de cliente
  const clientSecret = 'b7eb5b15a7a56382a50793b286d94429'; // Reemplaza con tu secreto de cliente
  const redirectUri = 'https://192.168.1.51:5173'; // Reemplaza con tu URL de redirección
  const scope = 'user_profile,user_media'; // Permisos que solicitas
  const responseType = 'code'; // Tipo de respuesta

  // Redirige al usuario para iniciar sesión en Instagram
  const handleLogin = () => {
    console.log('Redirigiendo al usuario para autenticarse en Instagram...');
    window.location.href = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;
  };

  // Intercambia el código de autorización por un token de acceso
  const exchangeCodeForAccessToken = (code) => {
    console.log('Intercambiando código por token de acceso:', code);

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
    .then(response => {
      console.log('Respuesta de la solicitud de token:', response);
      return response.json();
    })
    .then(data => {
      console.log('Datos del token de acceso recibidos:', data);
      if (data.access_token) {
        const accessToken = data.access_token;
        localStorage.setItem('accessToken', accessToken);
        setIsAuthenticated(true);
        fetchUserProfile(accessToken);
      } else {
        console.error('No se recibió el token de acceso:', data);
      }
    })
    .catch(error => {
      console.error('Error al intercambiar código por token de acceso:', error);
    });
  };

  // Obtiene el perfil del usuario utilizando el token de acceso
  const fetchUserProfile = (accessToken) => {
    console.log('Obteniendo perfil del usuario con el token:', accessToken);

    fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`)
      .then(response => {
        console.log('Respuesta de la solicitud del perfil:', response);
        return response.json();
      })
      .then(data => {
        console.log('Datos del perfil del usuario:', data);
        setProfileData(data);
      })
      .catch(error => {
        console.error('Error al obtener perfil del usuario:', error);
      });
  };

  // Maneja el código de autorización en la URL
  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');
    console.log('Código de autorización extraído de la URL:', code);

    if (code) {
      exchangeCodeForAccessToken(code);
    } else {
      console.log('No se encontró el código de autorización en la URL.');
    }
  }, [location]);

  return (
    <div>
      {!isAuthenticated ? (
        <>
          <h2>Inicio de sesión con Instagram</h2>
          <button onClick={handleLogin}>Iniciar sesión con Instagram</button>
        </>
      ) : (
        <div>
          <h2>Autenticado</h2>
          <p>Revisa la consola para ver la respuesta de Instagram.</p>
          {profileData && (
            <div>
              <h3>Perfil de Instagram</h3>
              <p>ID: {profileData.id}</p>
              <p>Nombre de usuario: {profileData.username}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InstagramAuthUnified;
