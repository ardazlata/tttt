const db = require("../Config/dbConfig");

const POI = {};

// poi model create
POI.createPOI = async (newPOI) => {
  try {
    const res = await db.query("INSERT INTO POIs SET ?", newPOI);
    return res;
  } catch (error) {
    throw error;
  }
};

// Fotoğraf ekleme işlevi
POI.createPhoto = async (poiId, photoUrl) => {
  try {
    await db.query("INSERT INTO photos (poi_id, photo_url) VALUES (?, ?)", [poiId, photoUrl]);
  } catch (error) {
    throw error;
  }
};

// get all points
POI.getAllPOIs = async () => {
  try {
    const res = await db.query("SELECT * FROM POIs");
    return res[0];
  } catch (error) {
    throw error;
  }
};

// Get POIs by route
POI.getPOIsByRoute = async (routeId) => {
  try {
    const res = await db.query(
      "SELECT * FROM POIs WHERE route_id = ?",
      routeId
    );
    return res[0];
  } catch (error) {
    throw error;
  }
};

// ---------------------------------------------

// Belirli bir POI'yi güncelle
POI.updatePOI = (poiId, updatedPOI, result) => {
  db.query(
    "UPDATE POIs SET ? WHERE id = ?",
    [updatedPOI, poiId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("updated POI: ", { id: poiId, ...updatedPOI });
      result(null, { id: poiId, ...updatedPOI });
    }
  );
};

// Belirli bir POI'yi sil
POI.deletePOI = (poiId, result) => {
  db.query("DELETE FROM POIs WHERE id = ?", poiId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("deleted POI with id: ", poiId);
    result(null, res);
  });
};

module.exports = POI;
