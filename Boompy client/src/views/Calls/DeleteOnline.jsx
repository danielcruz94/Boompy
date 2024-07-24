import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector} from "react-redux"

const DeleteUserOnUnmount = ({ userId, callInProgress, peer }) => {

  const serverURL = useSelector(state => state.serverURL.url);  
  const callsActive = useSelector((state) => state.callsActive);

  console.log(callInProgress)

  useEffect(() => {  

    const deleteUserOnline = async () => {
      try {
        const url = `${serverURL}/DeleteUserOnline/${userId}`;
        await axios.delete(url);
        peer.destroy()
        console.log(`Usuario con ID ${userId} eliminado correctamente`);
      } catch (error) {
        console.error(`Error al eliminar usuario con ID ${userId}:`, error);
      }
    };

    const handleBeforeUnload = (event) => {
      if (callInProgress) {
        const message = '¿Estás seguro de que quieres abandonar la llamada?';
        event.preventDefault(); 
        const result = window.confirm(message);
        if (!result) {
         
          event.returnValue = '';
          return;
        }
        deleteUserOnline();
        return message;
      } else {
      
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
 
      if (callInProgress) {
        deleteUserOnline();
      }
    };
  }, [userId, callInProgress]);

  return null; 
};

export default DeleteUserOnUnmount;
