const express = require('express');
const mongoose = require('mongoose');
const routes = require('./src/routes'); // Importeer routes vanuit de src/routes map
require('dotenv').config(); // Laad omgevingsvariabelen uit .env

const app = express();

// Voeg een route toe voor de root om te bevestigen dat de API draait
app.get('/', (req, res) => {
  res.send('API is running');
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

// Start de server op de opgegeven poort (uit .env of standaard 3450)
const PORT = process.env.PORT || 3450;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
