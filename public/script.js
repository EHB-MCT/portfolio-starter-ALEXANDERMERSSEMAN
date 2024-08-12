document.addEventListener('DOMContentLoaded', () => {
    const joinRoomButton = document.getElementById('joinRoom');
    const roomCodeInput = document.getElementById('roomCode');

    // Als we op de index.html-pagina zijn (controleer alleen voor het joinRoom gedeelte)
    if (joinRoomButton && roomCodeInput) {
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
});
