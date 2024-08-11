const Answer = require('../models/Answer');

exports.createAnswer = async (req, res) => {
  try {
    const newAnswer = new Answer(req.body);
    await newAnswer.save();
    res.status(201).json(newAnswer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) return res.status(404).json({ error: 'Answer not found' });
    res.status(200).json(answer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAnswer = async (req, res) => {
  try {
    const answer = await Answer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!answer) return res.status(404).json({ error: 'Answer not found' });
    res.status(200).json(answer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findByIdAndDelete(req.params.id);
    if (!answer) return res.status(404).json({ error: 'Answer not found' });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAnswersForQuestion = async (req, res) => {
  try {
    const answers = await Answer.find({ questionId: req.params.id });
    res.status(200).json(answers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
