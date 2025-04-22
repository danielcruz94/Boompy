import React, { useState, useEffect, useRef } from 'react';
import './ChatSupport.css';

const ChatSupport = () => {
  const [messages, setMessages] = useState([
    {
      text: "¡Hola! Bienvenido al chat de soporte de Torii. ¿En qué podemos ayudarte hoy?",
      sender: "support",
      time: "11:30"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      text: inputMessage,
      sender: "user",
      time: formatTime()
    };

    setMessages([...messages, userMessage]);
    setInputMessage("");
    
    // Simulate typing indicator
    setIsTyping(true);
    
    // Simulate response after delay
    setTimeout(() => {
      setIsTyping(false);
      
      const responses = [
        "Gracias por tu mensaje. Nuestro equipo de soporte está revisando tu caso.",
        "Entiendo tu consulta. ¿Podrías proporcionar más detalles para ayudarte mejor?",
        "Hemos registrado tu solicitud. Un especialista se pondrá en contacto contigo pronto."
      ];
      
      const supportMessage = {
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "support",
        time: formatTime()
      };
      
      setMessages(prevMessages => [...prevMessages, supportMessage]);
    }, 2500);
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
    <div className="chat-wrapper">
      {isOpen ? (
        <div className="chat-container">
          <div className="chat-header">
            <div className="header-content">
              <div className="logo-container">
                {/* Placeholder for logo */}
                <div className="logo">T</div>
              </div>
              <h2>Soporte Torii</h2>
              <div className="online-indicator"></div>
            </div>
            <button className="close-button" onClick={toggleChat}>✕</button>
          </div>
          
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.sender === "user" ? "message-user" : "message-support"}`}
              >
                {message.text}
                <div className="message-time">{message.time}</div>
              </div>
            ))}
            
            {isTyping && (
              <div className="support-typing">
                <span>Escribiendo</span>
                <div className="typing-dots">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            )}
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
        <div className="chat-bubble" onClick={toggleChat}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default ChatSupport;