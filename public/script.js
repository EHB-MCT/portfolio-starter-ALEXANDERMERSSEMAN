document.addEventListener('DOMContentLoaded', () => {
    const socket = io(); // Verbind met de Socket.IO server

    // Code voor index.html
    if (document.getElementById('roomCode') && document.getElementById('joinRoom')) {
        const joinRoomButton = document.getElementById('joinRoom');
        const roomCodeInput = document.getElementById('roomCode');

        joinRoomButton.addEventListener('click', () => {
            const roomCode = roomCodeInput.value;
            if (roomCode === 'CHAT-EHB-3dejaars') {
                // Zet de roomCode in de URL voor de chatpagina
                window.location.href = `/chat.html?room=${encodeURIComponent(roomCode)}`;
            } else {
                alert('Invalid room code. Please try again.');
            }
        });
    }

    // Code voor chat.html
    if (document.getElementById('messageInput') && document.getElementById('sendMessage') && document.getElementById('messages')) {
        const messageInput = document.getElementById('messageInput');
        const sendMessageButton = document.getElementById('sendMessage');
        const messagesList = document.getElementById('messages');

        // Verkrijg roomCode uit de URL
        const urlParams = new URLSearchParams(window.location.search);
        const roomCode = urlParams.get('room');
        if (roomCode) {
            socket.emit('joinRoom', roomCode); // Join de room
        }

        function addMessage(message) {
            const li = document.createElement('li');
            li.textContent = message;
            messagesList.appendChild(li);
        }

        sendMessageButton.addEventListener('click', () => {
            const message = messageInput.value;
            if (message && roomCode) {
                socket.emit('chatMessage', message, roomCode); // Verstuur het bericht naar de server
                messageInput.value = ''; // Maak het invoerveld leeg
            }
        });

        socket.on('chatMessage', (message) => {
            addMessage(message); // Ontvang en toon berichten
        });
    }
});
