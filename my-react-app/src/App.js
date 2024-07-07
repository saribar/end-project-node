
import React, { useState } from 'react';
import ChatApp from './ChatApp';

// const socket = socketIOClient('http://localhost:3000');

const App = () => {
  // const [message, setMessage] = useState('');
  // const [messages, setMessages] = useState([]);

  // const handleSendMessage = () => {
  //   if (message) {
  //     socket.emit('message', message);
  //     setMessages([...messages, message]);
  //     setMessage('');
  //   }
  // };

  // socket.on('message', (newMessage) => {
  //   setMessages([...messages, newMessage]);
  // });
 
  return (
    
      <div className="App">
     <ChatApp/>
      </div>

  );
};

export default App;