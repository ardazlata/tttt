const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const POIController = require('../Controllers/poiController');

// Tüm POI'leri listele
router.get('/', poiController.getAllPOIs);

// Yeni POI oluştur
router.post('/', upload.single('photo'), POIController.createPOI);

// Belirli bir rota ID'sine göre POI'leri listele
router.get('/:routeId', poiController.getPOIsByRoute);

// Belirli bir POI'yi güncelle
router.put('/:poiId', poiController.updatePOI);

// Belirli bir POI'yi sil
router.delete('/:poiId', poiController.deletePOI);


module.exports = router;
