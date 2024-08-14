const User = require('../models/user'); // Vergeet niet de juiste pad aan te passen

exports.login = async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ name, password });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.status(200).json({ role: user.role, message: `Logged in as ${user.role}` });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get students' });
  }
};

exports.getTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher' });
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get teachers' });
  }
};
