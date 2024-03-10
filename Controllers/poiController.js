const { getDownloadURL, ref, uploadBytes } = require('firebase/storage');
const { storage } = require('../Config/firebaseConfig');

const POIModel = require("../Models/poiModel");

async function uploadToFirebaseStorage(file) {
  try {
    const storageRef = ref(storage, 'uploads/' + file.originalname);
    await uploadBytes(storageRef, file.buffer);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    throw error;
  }
}

exports.createPOI = async (req, res) => {
  try {
    const { route_id, name, latitude, longitude, description } = req.body;
    
    // Fotoğrafı Firebase Storage'a yükle
    const photoUrl = await uploadToFirebaseStorage(req.file);
    
    // POI objesini oluştur
    const newPOI = {
      route_id,
      name,
      latitude,
      longitude,
      description,
      photo_url: photoUrl // photo_url olarak güncellendi
    };

    // Oluşturulan POI'yi veritabanına kaydet
    const createdPOI = await POIModel.createPOI(newPOI);
    
    // Başarılı yanıt gönder
    res.status(200).send({ message: "New point added successfully" });
  } catch (error) {
    // Hata durumunda uygun şekilde yanıt gönder
    res.status(500).send({
      message: error.message || "Some error occurred while creating the POI.",
    });
  }
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
