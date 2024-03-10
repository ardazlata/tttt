const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const POIController = require('../Controllers/poiController');

// Tüm POI'leri listele
router.get('/', POIController.getAllPOIs);

// Yeni POI oluştur
router.post('/', upload.single('photo'), POIController.createPOI);

// Belirli bir rota ID'sine göre POI'leri listele
router.get('/:routeId', POIController.getPOIsByRoute);

// Belirli bir POI'yi güncelle
router.put('/:poiId', POIController.updatePOI);

// Belirli bir POI'yi sil
router.delete('/:poiId', POIController.deletePOI);


module.exports = router;
