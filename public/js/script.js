document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    if (document.getElementById('roomCode') && document.getElementById('joinRoom')) {
        // Code voor index.html
        // ... (dezelfde code als eerder)
    }

    if (document.getElementById('messageInput') && document.getElementById('sendMessage') && document.getElementById('messages')) {
        const messageInput = document.getElementById('messageInput');
        const sendMessageButton = document.getElementById('sendMessage');
        const messagesList = document.getElementById('messages');

        const urlParams = new URLSearchParams(window.location.search);
        const roomCode = urlParams.get('room');
        const userName = urlParams.get('name');

        if (roomCode && userName) {
            socket.emit('joinRoom', roomCode);

            function addMessage(message, sender, isOwnMessage) {
                const li = document.createElement('li');
                li.classList.add('message');
                li.classList.add(isOwnMessage ? 'sent' : 'received');
                li.innerHTML = `<strong>${sender}:</strong> ${message}`;
                messagesList.appendChild(li);
                messagesList.scrollTop = messagesList.scrollHeight;
            }

            function sendMessage() {
                const message = messageInput.value;
                if (message) {
                    socket.emit('chatMessage', { message, userName }, roomCode);
                    messageInput.value = '';
                }
            }

            sendMessageButton.addEventListener('click', sendMessage);
            messageInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    sendMessage();
                }
            });

            // Ontvang en toon eerdere berichten
            socket.on('previousMessages', (messages) => {
                messages.forEach(({ message, userName: senderName }) => {
                    const isOwnMessage = senderName === userName;
                    addMessage(message, senderName, isOwnMessage);
                });
            });

            // Ontvang en toon nieuwe berichten
            socket.on('chatMessage', ({ message, userName: senderName }) => {
                const isOwnMessage = senderName === userName;
                addMessage(message, senderName, isOwnMessage);
            });
        }
    }
});
