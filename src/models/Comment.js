const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  answerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer' },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
  body: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
