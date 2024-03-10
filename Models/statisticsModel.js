const db = require("../Config/dbConfig");

const Statistics = {};

Statistics.getTotalVisitedPOIs = (userId, result) => {
  db.query(
    "SELECT COUNT(DISTINCT poi_id) AS total_visited_pois FROM User_POI_Visits WHERE user_id = ?",
    userId,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Total visited POIs: ", res[0].total_visited_pois);
      result(null, res[0].total_visited_pois);
    }
  );
};

Statistics.checkRouteCompletion = (userId, routeId, result) => {
  db.query(
    "SELECT COUNT(*) AS total_pois FROM POIs WHERE route_id = ?",
    routeId,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      const totalPOIs = res[0].total_pois;

      db.query(
        "SELECT COUNT(DISTINCT poi_id) AS visited_pois FROM User_POI_Visits WHERE user_id = ? AND poi_id IN (SELECT id FROM POIs WHERE route_id = ?)",
        [userId, routeId],
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }

          const visitedPOIs = res[0].visited_pois;

          // Tüm POI'ler ziyaret edildiyse rotayı bitir
          const routeCompleted = totalPOIs === visitedPOIs;

          result(null, routeCompleted);
        }
      );
    }
  );
};

Statistics.getTopVisitedRoutes = (limit, result) => {
  db.query(
    "SELECT user_id, COUNT(DISTINCT route_id) AS total_visited_routes FROM User_POI_Visits INNER JOIN POIs ON User_POI_Visits.poi_id = POIs.id GROUP BY user_id ORDER BY total_visited_routes DESC LIMIT ?",
    limit,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Top visited routes: ", res);
      result(null, res);
    }
  );
};

// --------------------------------------
// --------------------------------------
Statistics.getTopScores = async (limit) => {
  try {
    const topUsersScores = await db.query(
      `SELECT U.username, SUM(S.score) AS total_score
        FROM Users U
        JOIN User_POI_Visits S ON U.id = S.user_id
        GROUP BY U.id
        ORDER BY total_score DESC
        LIMIT ?
      `,
      limit
    );
    console.log("Top scores: ", topUsersScores);
    return topUsersScores[0];
  } catch (error) {
    console.log("error: ", error);
    throw new Error(error);
  }
};
// getAllTable
Statistics.getAllScores = async () => {
  try {
    const table = await db.query(`
    SELECT UPV.id, UPV.user_id, UPV.poi_id, UPV.score, U.username
    FROM User_POI_Visits UPV
    JOIN Users U ON UPV.user_id = U.id
  `);
    console.log("scores :  ", table);
    return table[0];
  } catch (error) {
    console.log("error: ", error);
    throw new Error(error);
  }
};

module.exports = Statistics;
