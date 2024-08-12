const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Zorg ervoor dat alle statische bestanden worden geserveerd

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinRoom', (roomCode) => {
        socket.join(roomCode);
        console.log(`User joined room ${roomCode}`);
    });

    socket.on('chatMessage', (message, roomCode) => {
        io.to(roomCode).emit('chatMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
