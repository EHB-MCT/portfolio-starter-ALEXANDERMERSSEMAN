const { students, teachers } = require('../authData');

exports.login = (req, res) => {
  const { name, password } = req.body;

  const student = students.find(user => user.name === name && user.password === password);
  if (student) {
    return res.status(200).json({ role: 'student', message: 'Logged in as student' });
  }

  const teacher = teachers.find(user => user.name === name && user.password === password);
  if (teacher) {
    return res.status(200).json({ role: 'teacher', message: 'Logged in as teacher' });
  }

  res.status(401).json({ message: 'Invalid credentials' });
};

exports.getStudents = (req, res) => {
  res.status(200).json(students);
};

exports.getTeachers = (req, res) => {
  res.status(200).json(teachers);
};
