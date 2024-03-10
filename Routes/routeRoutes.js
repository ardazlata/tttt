const express = require('express');
const router = express.Router();
const routeController = require('../Controllers/routeController');

// Tüm rotaları listele
router.get('/', routeController.listRoutes);

// Yeni rota oluştur
router.post('/', routeController.createRoute);

// Rota güncelle
router.put('/:id', routeController.updateRoute);

// Rota sil
router.delete('/:id', routeController.deleteRoute);

module.exports = router;
