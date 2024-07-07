const socket = io();
const messagesDiv = document.getElementById('messages');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = messageInput.value.trim();
  if (message) {
    socket.emit('chat:message', message);
    messageInput.value = '';
  }
});

socket.on('chat:message', (data) => {
  const messageDiv = document.createElement('div');
  messageDiv.innerText = data;
  messagesDiv.appendChild(messageDiv);
});