import { useEffect, useState, useRef } from 'react';
import { useSelector } from "react-redux";
import { io } from 'socket.io-client';
import './SupportChat.css';

const SupportChat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [isUserListOpen, setIsUserListOpen] = useState(false);
  const [allConversations, setAllConversations] = useState([]);
  const socketRef = useRef(null);
  const serverURL = useSelector(state => state.serverURL.url.replace('/api', ''));
  const messagesEndRef = useRef(null);

  // Conectar socket y obtener conversaciones al montar
  useEffect(() => {
    socketRef.current = io(serverURL);

    socketRef.current.emit('join-support');
    socketRef.current.emit('get-all-conversations');

    // Listener de todas las conversaciones iniciales
    socketRef.current.on('all-conversations', (conversations) => {
      setAllConversations(conversations);
      const usersList = conversations.map(convo => ({
        userId: convo.userId,
        name: convo.messages[0]?.name || 'Usuario'
      }));
      setUsers(usersList);
    });

    // Listener de mensajes nuevos en tiempo real
    socketRef.current.on('chat-message', ({ userId, ...newMsg }) => {
      setMessages(prev => ({
        ...prev,
        [userId]: [...(prev[userId] || []), newMsg]
      }));

      // Opcional: también actualiza `allConversations`
      setAllConversations(prev =>
        prev.map(convo =>
          convo.userId === userId
            ? { ...convo, messages: [...convo.messages, newMsg] }
            : convo
        )
      );
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [serverURL]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedUserId]);

  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const sendResponse = () => {
    if (!newMessage.trim() || !selectedUserId) return;

    const response = {
      userId: selectedUserId,
      text: newMessage,
      sender: "support",
      name: "Torii Soporte",
      time: formatTime()
    };

    socketRef.current.emit('send-to-user', { userId: selectedUserId, message: response });

    setMessages(prev => ({
      ...prev,
      [selectedUserId]: [...(prev[selectedUserId] || []), response]
    }));

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
