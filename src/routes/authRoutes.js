const express = require('express');
const router = express.Router();
const { students, teachers } = require('../authData');

// Inlogroute
router.post('/login', (req, res) => {
  const { name, password } = req.body;

  // Controleer of de gebruiker een leerling is
  const student = students.find(user => user.name === name && user.password === password);
  if (student) {
    return res.status(200).json({ role: 'student', message: 'Logged in as student' });
  }

  // Controleer of de gebruiker een leerkracht is
  const teacher = teachers.find(user => user.name === name && user.password === password);
  if (teacher) {
    return res.status(200).json({ role: 'teacher', message: 'Logged in as teacher' });
  }

  // Als de gebruiker niet wordt gevonden
  res.status(401).json({ message: 'Invalid credentials' });
});

// Voeg routes toe om de lijsten op te halen
router.get('/students', (req, res) => {
  res.status(200).json(students);
});

router.get('/teachers', (req, res) => {
  res.status(200).json(teachers);
});

module.exports = router;
