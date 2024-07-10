import React, { useEffect } from 'react';
import axios from 'axios';

const DeleteUserOnUnmount = ({ userId, callInProgress }) => {
  useEffect(() => {
    const deleteUserOnline = async () => {
      try {
        const url = `http://localhost:3001/api/DeleteUserOnline/${userId}`;
        await axios.delete(url);
        console.log(`Usuario con ID ${userId} eliminado correctamente`);
      } catch (error) {
        console.error(`Error al eliminar usuario con ID ${userId}:`, error);
      }
    };

    const handleBeforeUnload = (event) => {
      if (callInProgress) {
        const message = '¿Estás seguro de que quieres abandonar la llamada?';
        event.preventDefault(); // Previene que el navegador cierre la página directamente
        event.returnValue = message;
        const result = window.confirm(message);
        if (!result) {
          // Si el usuario cancela, no se hace nada
          event.returnValue = '';
          return;
        }
        // Si el usuario confirma, intenta eliminar al usuario
        deleteUserOnline();
        return message;
      } else {
        // Si callInProgress es false, simplemente elimina al usuario sin mostrar mensaje
        deleteUserOnline();
      }
    };

    const handlePopstate = () => {
      if (callInProgress) {
        window.history.pushState(null, null, window.location.pathname);
        deleteUserOnline();
      } else {
        deleteUserOnline();
      }
    };

    const handleHashchange = () => {
      if (callInProgress) {
        window.location.hash = '#';
        deleteUserOnline();
      } else {
        deleteUserOnline();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopstate);
    window.addEventListener('hashchange', handleHashchange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopstate);
      window.removeEventListener('hashchange', handleHashchange);
      
      // Asegurarse de eliminar al usuario si todavía está en progreso al desmontar el componente
      if (callInProgress) {
        deleteUserOnline();
      }
    };
  }, [userId, callInProgress]);

  return null; // Este componente no renderiza nada visualmente
};

export default DeleteUserOnUnmount;
