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
      // Obtiene el token de acceso y el perfil del usuario
      axios.get(`${serverURL}/callback?code=${code}`)
        .then(response => {
          if (response.data.error) {
            setError(response.data.error);
          } else {
            const { access_token, username } = response.data;

            // Obtiene las fotos del usuario
            axios.get(`${serverURL}/media?accessToken=${access_token}`)
              .then(mediaResponse => {
                const mediaUrls = mediaResponse.data.data
                  .slice(0, 3)
                  .map(media => media.media_url); 

                // Envía las URLs de las fotos al servidor para guardarlas
                axios.post(`${serverURL}/download-images`, {
                  userId: userData.id,
                  imageUrls: mediaUrls
                })
                .then(downloadResponse => {
                  // Actualiza los datos del usuario con las nuevas rutas de las imágenes
                  const updateData = {
                    instagram: `https://www.instagram.com/${username}`,
                    photos: downloadResponse.data.filePaths
                  };

                  axios.put(`${serverURL}/instagram/${userData.id}`, updateData)
                    .then(() => {
                      // Redirige al usuario o muestra un mensaje de éxito
                      window.location.href = URL;
                    })
                    .catch(updateError => {
                      console.error('Error al actualizar Instagram:', updateError);
                      setError('Error al actualizar Instagram.');
                      window.location.href = URL;
                    });
                })
                .catch(downloadError => {
                  console.error('Error al descargar las imágenes:', downloadError);
                  setError('Error al descargar las imágenes.');
                  window.location.href = URL;
                });
              })
              .catch(mediaError => {
                console.error('Error al obtener las fotos:', mediaError);
                setError('Error al obtener las fotos.');
                window.location.href = URL;
              });
          }
        })
        .catch(callbackError => {
          console.error('Error al obtener el perfil:', callbackError);
          setError('Error al obtener el perfil.');
          window.location.href = URL;
        });
    } else {
      handleLogin();
    }
  }, [location, serverURL, userData.id]);

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
};

export default InstagramAuth;
