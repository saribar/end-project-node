import React,{useEffect,useState} from 'react';
import io from 'socket.io-client';
const socket = io();
const ChatApp =()=>{
  const [messages,setMessages] = useState([]);
  const [message,setMessage] = useState(' ');

  useEffect(()=>{
    socket.on('chat: message', (data)=>{
      setMessages((prevMessages)=>[...prevMessages,data]);
      console.log('Received message:', data);
    });
    return () =>socket.disconnect();
  },[]);

  const handleSubmit=(event)=>{
    event.preventDefault();
    if(message.trim()){
      socket.emit('chat:message', message);
      setMessage(' ');
    }
  };

  return (
    <div className="chatApp">
      <ul>
        {message.map((msg)=> (
          <li key={msg}>{msg}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
         type="text"
          value ={message} 
          onChange={(e) => setMessage(e.target.value)}
        />
      
        <button type="submit">שלח</button>
        
      </form>
    </div>
    
  );
};
export default ChatApp;




// import React, { useState, useEffect } from 'react';
// import socketIOClient from 'socket.io-client';

// const ENDPOINT = 'http://localhost:4000';
// const socket = socketIOClient(ENDPOINT);

// function ChatApp() {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');

//   useEffect(() => {
//     socket.on('chat message', (msg) => {
//       setMessages((prevMessages) => [...prevMessages, msg]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const sendMessage = () => {
//     socket.emit('chat message', newMessage);
//     setNewMessage('');
//   };

//   return (
//     <div>
//       {messages.map((msg, index) => (
//         <div key={index}>{msg}</div>
//       ))}
//       <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// }

// export default ChatApp;