document.addEventListener('DOMContentLoaded', () => {
  const joinRoomButton = document.getElementById('joinRoom');
  const messageInput = document.getElementById('messageInput');
  const sendMessageButton = document.getElementById('sendMessage');
  const messagesList = document.getElementById('messages');

  // Als we op de index.html-pagina zijn
  if (joinRoomButton) {
      joinRoomButton.addEventListener('click', () => {
          const roomCode = document.getElementById('roomCode').value;
          if (roomCode === 'CHAT-EHB-3dejaars') {
              window.location.href = '/chat.html';
          } else {
              alert('Invalid room code. Please try again.');
          }
      });
  }

  // Als we op de chat.html-pagina zijn
  if (messageInput && sendMessageButton && messagesList) {
      const socket = io(); // Verbind met de Socket.IO server

      function addMessage(message) {
          const li = document.createElement('li');
          li.textContent = message;
          messagesList.appendChild(li);
      }

      sendMessageButton.addEventListener('click', () => {
          const message = messageInput.value;
          if (message) {
              socket.emit('chat message', message);
              messageInput.value = '';
          }
      });

      socket.on('chat message', (message) => {
          addMessage(message);
      });
  }
});
