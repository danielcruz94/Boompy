import { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import { io } from 'socket.io-client';
import './ChatSupport.css';
import axios from 'axios'

const ChatSupport = () => {
  const [messages, setMessages] = useState([]); 
  const [inputMessage, setInputMessage] = useState(""); 
  const [isOpen, setIsOpen] = useState(false); 
  const [isConnected, setIsConnected] = useState(false); 
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  const serverURL = useSelector(state => state.serverURL.url.replace('/api', '')); 

  // Obtener datos del usuario desde localStorage
  const userData = JSON.parse(localStorage.getItem('userData')) || {};
  const userName = userData.name || "Usuario";
  const userRole = userData.role || "usuario";
  const userId = userData.id;

  // Scroll al final
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Formatear la hora
  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Conectar al WebSocket
  useEffect(() => {
    const connectSocket = () => {
      socketRef.current = io(serverURL, { transports: ['websocket'] });
  
      socketRef.current.on("connect", () => {
        setIsConnected(true);
        setError("");
        socketRef.current.emit("join-user", { userId });
      });
  
      socketRef.current.on("disconnect", () => {
        setIsConnected(false);
      });
  
      socketRef.current.on("connect_error", (err) => {
        setError("Error de conexión: " + err.message);
      });
  
      // Escuchar historial del chat
      socketRef.current.on("chat-history", (historyMessages) => {
        setMessages([
          {
            text: "¡Hola! Bienvenido al chat de soporte. ¿En qué podemos ayudarte hoy?",
            sender: "support",
            name: "Torii Soporte",
            time: formatTime(),
            userId: "support"
          },
          ...historyMessages
        ]);
      });
  
      // Escuchar mensajes nuevos en tiempo real
      socketRef.current.on("chat-message", (data) => {
        const { userId, text, sender, name, time } = data;
  
        const message = { userId, text, sender, name, time };
  
        setMessages(prev => {
          const isDuplicate = prev.some(
            m => m.text === message.text &&
                 m.time === message.time &&
                 m.sender === message.sender
          );
          return isDuplicate ? prev : [...prev, message];
        });
      });
    };
  
    connectSocket();
  
    return () => {
      socketRef.current?.disconnect();
    };
  }, [serverURL, userId]);
  

  // Scroll automático cuando cambian los mensajes
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enviar mensaje
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
  
    const message = {
      text: inputMessage,
      sender: userRole,
      name: userName,
      time: formatTime(),
      userId
    };
  
    // Mostrar el mensaje del usuario en la interfaz
    setMessages(prev => [
      ...prev,
      {
        ...message,
        sender: "user", 
      }
    ]);
  
    // Enviar mensaje al servidor (WebSocket)
    socketRef.current.emit("mensaje", { userId, message });
  
    // Enviar notificación por correo electrónico al soporte
    const emailData = {
      to: 'Daniel94cruz@gmail.com',  
      subject: 'Nuevo mensaje de soporte en Torii',
      text: `Nuevo mensaje de  ${userName}`,
    };
  
    try {
      // Enviar el correo al servidor de backend para su procesamiento
      await axios.post(`${serverURL}/email/enviar-email`, emailData);
      console.log('Correo enviado');
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }
  
    // Limpiar el campo de entrada después de enviar el mensaje
    setInputMessage(""); 
  };
  
  // Enviar con Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Abrir/cerrar chat
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chat-wrapper">
      {isOpen ? (
        <div className="chat-container">
          <div className="chat-header">
            <div className="header-content">
              <div className="logo-container">
                <div className="logo">T</div>
              </div>
              <h2>Torii Soporte</h2>
              
            </div>
            <button className="close-button" onClick={toggleChat}>✕</button>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender === "user" ? "message-user" : "message-support"}`}>
                <strong>{message.name}:</strong> 
                <p>{message.text}</p>


                {/*<div className="message-time">{message.time}</div>*/}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="send-button" onClick={handleSendMessage}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="PQRS black" onClick={toggleChat}>
          <p className="black">PQRS</p>
          <div>
            <img src="/landing/Icono.png" alt="TORII" className="Icon_TORII" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSupport;
