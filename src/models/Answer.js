const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  body: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Answer', answerSchema);
