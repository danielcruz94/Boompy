import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const InstagramAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  const serverURL = useSelector(state => state.serverURL.url);
  const userDataString = localStorage.getItem('userData');
  const userData = JSON.parse(userDataString);

  const currentHost = window.location.hostname; 
  
  const URL = currentHost === "toriiapp.netlify.app"
    ? 'https://toriiapp.netlify.app/'
    : 'https://localhost:5173/';

  // Redirige al usuario para iniciar sesión en Instagram
  const handleLogin = async () => {
    try {
      const response = await axios.get(`${serverURL}/auth`);
      const authUrl = response.data.redirectUrl;
      window.location.href = authUrl; 
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al iniciar sesión.');
      window.location.href = URL;
    }
  };

  // Maneja el código de autorización en la URL
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');
    
    if (code) {
      fetch(`${serverURL}/callback?code=${code}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            const accessToken = data.access_token;

            fetch(`${serverURL}/media?accessToken=${accessToken}`)
              .then(response => response.json())
              .then(mediaResponse => {
                const mediaUrls = mediaResponse.data
                  .slice(0, 3)
                  .map(media => media.media_url); 

                const updateData = {
                  id: userData.id,
                  instagram: `https://www.instagram.com/${data.username}`,
                  photos: mediaUrls
                };

                axios.put(`${serverURL}/instagram/${userData.id}`, updateData)
                  .then(() => {
                    window.location.href = URL;
                  })
                  .catch(error => {
                    console.error('Error al actualizar Instagram:', error);
                    setError('Error al actualizar Instagram.');
                    window.location.href = URL;
                  });
              })
              .catch(error => {
                console.error('Error al obtener las fotos:', error);
                setError('Error al obtener las fotos.');
                window.location.href = URL;
              });
          }
        })
        .catch(error => {
          console.error('Error al obtener el perfil:', error);
          setError('Error al obtener el perfil.');
          window.location.href = URL;
        });
    } else {
      handleLogin();
    }
  }, [location, serverURL]);

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
};

export default InstagramAuth;
