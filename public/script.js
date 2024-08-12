document.addEventListener('DOMContentLoaded', () => {
    const joinRoomButton = document.getElementById('joinRoom');
    
    // Event listener voor de "Join Room" button
    joinRoomButton.addEventListener('click', () => {
      const roomCode = document.getElementById('roomCode').value;
      
      // Controleer of de room code correct is
      if (roomCode === 'CHAT-EHB-3dejaars') {
        // Verwijs naar de chatpagina
        window.location.href = '/chat.html';
      } else {
        // Toon een foutmelding als de code niet klopt
        alert('Invalid room code. Please try again.');
      }
    });
  });
  