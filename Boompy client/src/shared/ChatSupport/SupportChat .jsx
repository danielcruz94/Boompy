import { useEffect, useState, useRef } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';
import Pusher from 'pusher-js';
import './SupportChat.css';

const SupportChat = () => {
  const [users, setUsers] = useState([]); // Lista de usuarios
  const [selectedUserId, setSelectedUserId] = useState(null); // Usuario seleccionado
  const [messages, setMessages] = useState({}); // Mensajes por usuario
  const [newMessage, setNewMessage] = useState(''); // Mensaje nuevo a enviar
  const [isUserListOpen, setIsUserListOpen] = useState(false); // Estado de la lista de usuarios
  const [allConversations, setAllConversations] = useState([]); // Todas las conversaciones
  const serverURL = useSelector(state => state.serverURL.url); // URL del servidor
  const messagesEndRef = useRef(null); // Referencia para el scroll al final de los mensajes

  // Obtener conversaciones y suscribir a Pusher
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get(`${serverURL}/conversations`);
        setAllConversations(res.data);

        const userList = res.data.map(convo => ({
          userId: convo.userId,
          name: convo.messages[0]?.name || 'Usuario'
        }));
        setUsers(userList);
      } catch (error) {
        console.error('❌ Error al obtener conversaciones:', error);
      }
    };

    fetchConversations();

    // Pusher configuración
    const pusher = new Pusher('e2be01e39a4d829d6f13', {
      cluster: 'us2'
    });

    const channel = pusher.subscribe('support-channel');
    channel.bind('chat-message', ({ userId, ...newMsg }) => {
      // Actualiza los mensajes
      setMessages(prev => ({
        ...prev,
        [userId]: [...(prev[userId] || []), newMsg]
      }));

      // Actualiza el resumen de la conversación
      setAllConversations(prev =>
        prev.map(convo =>
          convo.userId === userId
            ? { ...convo, messages: [...convo.messages, newMsg] }
            : convo
        )
      );

      // Si el usuario no está en la lista, añadirlo
      setUsers(prevUsers => {
        if (!prevUsers.find(user => user.userId === userId)) {
          const userName = newMsg.name || 'Usuario';
          return [...prevUsers, { userId, name: userName }];
        }
        return prevUsers;
      });
    });

    return () => {
      pusher.unsubscribe('support-channel');
      pusher.disconnect();
    };
  }, [serverURL]);

  useEffect(() => {
    // Desplazar el chat al final cada vez que se reciban nuevos mensajes
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedUserId]);

  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const sendResponse = async () => {
    if (!newMessage.trim() || !selectedUserId) return;

    const response = {
      userId: selectedUserId,
      text: newMessage,
      sender: "support",
      name: "Torii Soporte",
      time: formatTime()
    };

    try {
      await axios.post(`${serverURL}/chat/support-message`, {
        userId: selectedUserId,
        message: response
      });

      setMessages(prev => ({
        ...prev,
        [selectedUserId]: [...(prev[selectedUserId] || []), response]
      }));
    } catch (err) {
      console.error('❌ Error al enviar respuesta:', err);
    }

    setNewMessage('');
  };

  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);

    const selectedConversation = allConversations.find(convo => convo.userId === userId);
    if (selectedConversation) {
      setMessages(prev => ({
        ...prev,
        [userId]: selectedConversation.messages
      }));
    }

    setIsUserListOpen(false);
  };

  return (
    <div className="support-chat">
      <aside className={`user-list ${isUserListOpen ? 'open' : ''}`}>
        <h3>Usuarios</h3>
        {users.map(user => (
          <div
            key={user.userId}
            className={`user-item ${user.userId === selectedUserId ? 'active' : ''}`}
            onClick={() => handleSelectUser(user.userId)}
          >
            {user.name}
          </div>
        ))}
      </aside>

      <section className="chat-section">
        <div className="mobile-header">
          <button className="toggle-user-list" onClick={() => setIsUserListOpen(!isUserListOpen)}>
            ☰
          </button>
          <span>
            {selectedUserId
              ? `Chat con ${users.find(u => u.userId === selectedUserId)?.name || 'Usuario'}`
              : 'Soporte Torii'}
          </span>
        </div>

        {selectedUserId ? (
          <>
            <div className="chat-header">
              <h2>Chat con {users.find(u => u.userId === selectedUserId)?.name}</h2>
            </div>

            <div className="chat-messages">
              {(messages[selectedUserId] || []).map((msg, i) => (
                <div key={i} className={`message ${msg.sender === "user" ? "support" : "user"}`}>
                  <strong>{msg.name}:</strong>
                  <p>{msg.text}</p>
                  <div className="message-time">{msg.time}</div>
                </div>
              ))}
              <div ref={messagesEndRef}></div>
            </div>

            <div className="chat-input">
              <input
                type="text"
                placeholder="Escribe una respuesta..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendResponse()}
              />
              <button onClick={sendResponse}>Enviar</button>
            </div>
          </>
        ) : (
          <div className="no-user-selected">
            <div className="no-user-content">
              <img src="https://img.icons8.com/ios-filled/100/000000/chat.png" alt="Chat" />
              <h2>Bienvenido al centro de soporte</h2>
              <p>Selecciona un usuario de la lista para comenzar un chat.</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default SupportChat;
