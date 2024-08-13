const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(express.static('public'));
app.use('/api', messageRoutes); // Verbind de routes

mongoose.connect('mongodb://mongo:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinRoom', async (roomCode) => {
        socket.join(roomCode);
        console.log(`User joined room ${roomCode}`);
        
        // Stuur eerdere berichten naar de gebruiker die de room join
        const messages = await Message.find({ roomCode }).sort({ timestamp: 1 });
        socket.emit('previousMessages', messages);
    });

    socket.on('chatMessage', async ({ message, userName }, roomCode) => {
        const newMessage = new Message({ roomCode, userName, message });
        await newMessage.save();
        io.to(roomCode).emit('chatMessage', { message, userName, timestamp: newMessage.timestamp });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
