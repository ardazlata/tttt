const StatisticsModel = require('../Models/statisticsModel');

exports.getTotalVisitedPOIs = (req, res) => {
    const userId = req.params.userId;

    StatisticsModel.getTotalVisitedPOIs(userId, (error, data) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Some error occurred while retrieving total visited POIs."
            });
        } else {
            res.send({ total_visited_pois: data });
        }
    });
};

exports.checkRouteCompletion = (req, res) => {
    const userId = req.params.userId;
    const routeId = req.params.routeId;

    StatisticsModel.checkRouteCompletion(userId, routeId, (error, routeCompleted) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Some error occurred while checking route completion."
            });
        } else {
            res.send({ routeCompleted });
        }
    });
};

exports.getTopVisitedRoutes = (req, res) => {
    const limit = req.query.limit || 10; // Varsayılan olarak 10 kullanıcıyı getir
    StatisticsModel.getTopVisitedRoutes(limit, (error, data) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Some error occurred while retrieving top visited routes."
            });
        } else {
            res.send(data);
        }
    });
};

exports.getTopScores = async (req, res) => {
    const limit = req.query.limit || 5; // Varsayılan olarak 10 kullanıcıyı getir
    try {
        const top = await  StatisticsModel.getTopScores(limit)
        res.status(200).json(top);
   } catch (error) {
            res.status(500).send({
                message: error.message || "Some error occurred while retrieving top scores."
            });
        }
};
exports.getAllScores = async (req,res)=>{
const allData = await StatisticsModel.getAllScores();
console.log(allData);
res.status(200).json(allData)
}
// getTopScores/
