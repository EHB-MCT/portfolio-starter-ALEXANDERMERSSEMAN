const express = require('express');
const router = express.Router();

// Importeer controllers
const questionController = require('../controllers/questionController');
const answerController = require('../controllers/answerController');

// Vragen routes
router.post('/questions', questionController.createQuestion);
router.get('/questions', questionController.getAllQuestions);
router.get('/questions/:id', questionController.getQuestion);
router.put('/questions/:id', questionController.updateQuestion);
router.delete('/questions/:id', questionController.deleteQuestion);

// Antwoorden routes
router.post('/answers', answerController.createAnswer);
router.get('/answers/:id', answerController.getAnswer);
router.put('/answers/:id', answerController.updateAnswer);
router.delete('/answers/:id', answerController.deleteAnswer);
router.get('/questions/:id/answers', answerController.getAnswersForQuestion);

module.exports = router;