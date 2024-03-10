const POIModel = require('../Models/poiModel');
const { storage: firebaseStorage } = require('../Config/firebaseConfig');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

// Dosyaları bellekte saklamak için multer'ın memoryStorage'ını kullanın
const multer = require('multer');
const multerStorage = multer.memoryStorage();

// Dosya filtreleme fonksiyonu
const fileFilter = (req, file, cb) => {
  // Kabul edilen resim MIME türleri
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Dosyayı kabul et
  } else {
    cb(new Error('Yalnızca resim dosyaları kabul edilir'), false); // Dosyayı reddet
  }
};

// Multer'ı yapılandır
const upload = multer({ storage: multerStorage, fileFilter: fileFilter }).single('photo_url');

// POI oluşturma
exports.createPOI = async (req, res) => {
    const { route_id, name, latitude, longitude, description } = req.body;

    // Dosya yükleme işlemi
    upload(req, res, async function(err) {
        if (err) {
            // Dosya yükleme hatasıyla karşılaşıldığında burası çalışır
            console.error(err);
            return res.status(500).send({ message: "Dosya yükleme hatası." });
        }

        // Dosya yükleme başarılı olduğunda devam edilir
        try {
            const storageRef = ref(firebaseStorage, 'uploads/' + req.file.originalname);
            await uploadBytes(storageRef, req.file.buffer);
            const downloadURL = await getDownloadURL(storageRef);

            // POI objesini oluştur
            const newPOI = {
                route_id,
                name,
                latitude,
                longitude,
                description,
                photo_url: downloadURL // Dosya URL'si olarak güncellendi
            };

            // Oluşturulan POI'yi veritabanına kaydet
            const createdPOI = await POIModel.createPOI(newPOI);

            // Başarılı yanıt gönder
            return res.status(200).send({ message: "Yeni nokta başarıyla eklendi." });
        } catch (error) {
            // Hata durumunda uygun şekilde yanıt gönder
            res.status(500).send({
                message: error.message || "POI oluşturulurken bir hata oluştu.",
            });
        }
    });
};



exports.getAllPOIs = async (req, res) => {
  try {
    const data = await POIModel.getAllPOIs();
    res.status(200).send(data);

  } catch (error) {
    res.status(500).send({
      message: "Some error occurred while retrieving POIs.",
    });
  }
};

// Belirli bir rota ID'sine göre POI'leri listele
exports.getPOIsByRoute = async (req, res) => {
  const routeId = req.params.routeId;

  // Rota ID'sine göre POI'leri getir
  try {
    const data = await POIModel.getPOIsByRoute(routeId);
    if(data.length)
    res.status(200).send(data);
  else
  res.status(200).json({message:"No Points in this route"});
  } catch (error) {
    res.status(500).send({
      message: "Some error occurred while getting POIs via route.",
    });
  }
};

// -------------------------------------------------------

// Belirli bir POI'yi güncelle
exports.updatePOI = async (req, res) => {
  const poiId = req.params.poiId;
  const updatedPOI = req.body;

  // POI'yi güncelle
  try {
    await POIModel.updatePOI(poiId, updatedPOI);
    res.status(200).send({ message: "POI updated successfully" });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while updating the POI.",
    });
  }
};

// Belirli bir POI'yi sil
exports.deletePOI = (req, res) => {
  const poiId = req.params.poiId;

  // POI'yi sil
  POIModel.deletePOI(poiId, (error, data) => {
    if (error) {
      res.status(500).send({
        message: error.message || "Some error occurred while deleting the POI.",
      });
    } else {
      res.send({ message: "POI was deleted successfully!" });
    }
  });
};
