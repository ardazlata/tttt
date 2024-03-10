const db = require("../Config/dbConfig");

const UserPoi = {};

UserPoi.createUserPOI = async (poiId, userId, score) => {
  const newVisit = {
    poi_id: poiId,
    user_id: userId,
    score: score,
  };
  try {
    await db.query("INSERT INTO User_POI_Visits SET ?", newVisit);
  } catch (error) {
    throw error
  }
};
UserPoi.getAllUserPOIs = async () => {
  try {
    const res = await db.query("SELECT * FROM POIs");
    return res[0];
  } catch (error) {
    throw error
  }
};

module.exports = UserPoi;
