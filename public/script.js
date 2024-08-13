document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    // Code voor index.html
    if (document.getElementById('roomCode') && document.getElementById('joinRoom')) {
        const joinRoomButton = document.getElementById('joinRoom');
        const roomCodeInput = document.getElementById('roomCode');
        const userNameInput = document.getElementById('userName');
        const anonymousSwitch = document.getElementById('anonymousSwitch'); // Schuifknop voor anonimiteit

        joinRoomButton.addEventListener('click', () => {
            const roomCode = roomCodeInput.value;
            let userName = userNameInput.value.trim();

            if (anonymousSwitch.checked) {
                userName = 'Anoniem'; // Gebruik 'Anoniem' als de gebruiker de schuifknop heeft ingeschakeld
            }

            if (roomCode === 'CHAT-EHB-3dejaars' && (userName || anonymousSwitch.checked)) {
                window.location.href = `/chat.html?room=${encodeURIComponent(roomCode)}&name=${encodeURIComponent(userName)}`;
            } else {
                alert('Invalid room code or name. Please try again.');
            }
        });
    }

    // Code voor chat.html
    if (document.getElementById('messageInput') && document.getElementById('sendMessage') && document.getElementById('messages')) {
        const messageInput = document.getElementById('messageInput');
        const sendMessageButton = document.getElementById('sendMessage');
        const messagesList = document.getElementById('messages');

        const urlParams = new URLSearchParams(window.location.search);
        const roomCode = urlParams.get('room');
        const userName = urlParams.get('name');

        if (roomCode && userName) {
            socket.emit('joinRoom', roomCode);

            function addMessage(message, sender) {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${sender}:</strong> ${message}`;
                messagesList.appendChild(li);
            }

            sendMessageButton.addEventListener('click', () => {
                const message = messageInput.value;
                if (message) {
                    socket.emit('chatMessage', { message, userName }, roomCode);
                    messageInput.value = '';
                }
            });

            socket.on('chatMessage', ({ message, userName }) => {
                addMessage(message, userName);
            });
        }
    }
});
