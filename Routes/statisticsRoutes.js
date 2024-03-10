const express = require('express');
const router = express.Router();
const statisticsController = require('../Controllers/statisticsController');

router.get('/totalVisitedPOIs/:userId', statisticsController.getTotalVisitedPOIs);
router.get('/checkRouteCompletion/:userId/:routeId', statisticsController.checkRouteCompletion);
router.get('/topVisitedRoutes', statisticsController.getTopVisitedRoutes);
router.get('/topScores', statisticsController.getTopScores);
router.get('/allScores', statisticsController.getAllScores);

module.exports = router;
