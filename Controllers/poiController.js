const POIModel = require("../Models/poiModel");

exports.createPOI = async (req, res) => {
  // Request body'den POI bilgilerini al
  const { route_id, name, latitude, longitude, description } = req.body;

  // POI bilgilerini kontrol et
  if (!route_id || !name || !latitude || !longitude) {
    return res.status(400).send({
      message: "Required fields can not be empty!",
    });
  }

  // POI object content
  const newPOI = {
    route_id,
    name,
    latitude,
    longitude,
    description,
  };

  // Modeli kullanarak yeni POI'yi veritabanına kaydet
  try {
    await POIModel.createPOI(newPOI);
    res.status(200).send({ messgae: "New point added successfully" });
  } catch (error) {
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
exports.updatePOI = (req, res) => {
  const poiId = req.params.poiId;
  const updatedPOI = req.body;

  // POI'yi güncelle
  POIModel.updatePOI(poiId, updatedPOI, (error, data) => {
    if (error) {
      res.status(500).send({
        message: error.message || "Some error occurred while updating the POI.",
      });
    } else {
      res.send(data);
    }
  });
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
