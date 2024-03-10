// quizRoutes.js

const express = require('express');
const router = express.Router();
const quizController = require('../Controllers/quizController');

// Bir POI için quiz oluştur
router.post('/', quizController.createQuiz);

// Bir POI'ye ait tüm quizleri listele
router.get('/:poiId', quizController.getQuizzesByPOI);

// Quiz silme
router.delete('/:quizId', quizController.deleteQuiz);

// Quiz güncelleme
router.put('/:quizId', quizController.updateQuiz);

module.exports = router;
