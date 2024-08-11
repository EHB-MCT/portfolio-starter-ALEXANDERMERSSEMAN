const express = require('express');
const router = express.Router();

// Importeer controllers
const questionController = require('../controllers/questionController');
const answerController = require('../controllers/answerController');
const commentController = require('../controllers/commentController');

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

// Reacties routes
router.post('/comments', commentController.createComment);
router.get('/comments/:id', commentController.getComment);
router.put('/comments/:id', commentController.updateComment);
router.delete('/comments/:id', commentController.deleteComment);

module.exports = router;
