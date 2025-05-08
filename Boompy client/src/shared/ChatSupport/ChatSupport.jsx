import { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import Pusher from 'pusher-js';
import './ChatSupport.css';
import axios from 'axios';

const ChatSupport = () => {
  const [messages, setMessages] = useState([]); 
  const [inputMessage, setInputMessage] = useState(""); 
  const [isOpen, setIsOpen] = useState(false); 
  const messagesEndRef = useRef(null);

  const serverURL = useSelector(state => state.serverURL.url);

  const userData = JSON.parse(localStorage.getItem('userData')) || {};
  const userName = userData.name || "Usuario";
  const userRole = userData.role || "usuario";
  const userId = userData.id;

  const formatTime = () => {
    const now = new Date();
  
    const day = String(now.getDate()).padStart(2, '0');  
    const month = String(now.getMonth() + 1).padStart(2, '0');  
    const year = now.getFullYear();  
    
    let hour = now.getHours();  
    const minute = String(now.getMinutes()).padStart(2, '0');  
    
    const isPM = hour >= 12;  
    hour = hour % 12 || 12;  
    
    const period = isPM ? 'PM' : 'AM';  
    
    return `${day}/${month}/${year} ${String(hour).padStart(2, '0')}:${minute} ${period}`;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!userId) return; // ✅ Previene errores si userId no está definido

    // 1. Obtener historial de mensajes
    const getHistory = async () => {
      try {
        const res = await axios.get(`${serverURL}/conversations`);
        const convo = res.data.find(c => c.userId === userId);
        const history = convo ? convo.messages : [];

        setMessages([
          {
            text: "¡Hola! Bienvenido al chat de soporte. ¿En qué podemos ayudarte hoy?",
            sender: "support",
            name: "Torii Soporte",
            time: formatTime(),
            userId: "support"
          },
          ...history
        ]);
      } catch (err) {
        console.error("❌ Error al obtener historial:", err);
      }
    };

    getHistory();

    // 2. Conectarse a Pusher
    const pusher = new Pusher("e2be01e39a4d829d6f13", {
      cluster: "us2"
    });

    // Canal general para mensajes del soporte
    const userChannel = pusher.subscribe(`user-${userId}`);
    userChannel.bind("chat-message", data => {
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

    return () => {
      pusher.unsubscribe(`user-${userId}`);
      pusher.disconnect();
    };
  }, [serverURL, userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const message = {
      text: inputMessage,
      sender: userRole,
      name: userName,
      time: formatTime(),
      userId
    };

    // Añadir mensaje del usuario al chat localmente
    setMessages(prev => [
      ...prev,
      {
        ...message,
        sender: "user"
      }
    ]);

    try {
      // Enviar mensaje al backend (Pusher lo emitirá)
      await axios.post(`${serverURL}/chat/user-message`, {
        userId,
        message
      });

      // Enviar correo al soporte
      await axios.post(`${serverURL}/api/email/enviar-email`, {
        to: 'daniel94cruz@gmail.com',
        subject: 'Nuevo mensaje de soporte en Torii',
        text: `Nuevo mensaje de ${userName}`
      });

    } catch (err) {
      console.error('❌ Error al enviar mensaje o correo:', err);
    }

    setInputMessage(""); 
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen ? (
        <div className="chat-wrapper">
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

            <div className="chat-messages">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.sender === "user" ? "message-user" : "message-support"}`}>
                  <strong>{message.name}:</strong> 
                  <p>{message.text}</p>
                  <div className="message-time">{message.time}</div>
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
        </div>
      ) : (
        <div className="PQRS black" onClick={toggleChat}>
          <p className="">PQRS</p>
          <div>
            <img src="/landing/Icono.png" alt="TORII" className="Icon_TORII" />
          </div>
        </div>
      )}
    </>  
  );
};

export default ChatSupport;
