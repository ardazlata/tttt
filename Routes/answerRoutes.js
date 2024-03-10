const express = require('express');
const router = express.Router();
const answerController = require('../Controllers/answerController');
const {protect} = require ("../authMiddleware")
// Bir kullanıcının bir quiz sorusuna verdiği cevabı kaydet
router.post('/', protect,answerController.submitCompleteQuiz);


module.exports = router;
