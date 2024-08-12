const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const routes = require('./src/routes'); // Zorg ervoor dat deze module correct is geïmplementeerd
require('dotenv').config();

const app = express();
const server = http.createServer(app);  // Creëer een HTTP server voor Socket.IO
const io = new Server(server); // Initialiseer Socket.IO met de server

// Serve statische bestanden vanuit de 'public' map
app.use(express.static('public'));

// Voeg een route toe voor de root om de HTML-pagina te serveren
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Voeg een test route toe
app.get('/test', (req, res) => {
  res.send('Test route works');
});

// Middleware voor het parsen van JSON-verzoeken
app.use(express.json());

// Verbind met de MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Database connection error:', err));

// Gebruik routes vanuit de src/routes map
app.use('/api', routes); // Prefix alle routes met /api

// Foutafhandeling middleware (optioneel)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Socket.IO communicatie
io.on('connection', (socket) => {
  console.log('A user connected');

  // Luister naar 'joinRoom' event
  socket.on('joinRoom', (roomCode) => {
    socket.join(roomCode);
    console.log(`User joined room: ${roomCode}`);
  });

  // Luister naar 'chatMessage' event
  socket.on('chatMessage', (msg, roomCode) => {
    io.to(roomCode).emit('chatMessage', msg); // Verzend bericht naar alle gebruikers in de room
  });

  // Luister naar disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start de server op de opgegeven poort (uit .env of standaard 3453)
const PORT = process.env.PORT || 3453;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});