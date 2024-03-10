// quizModel.js

const db = require("../Config/dbConfig");

const Quiz = {};

Quiz.createQuiz = async (newQuiz)=> {
  try {
    await db.query("INSERT INTO Quizzes SET ?", newQuiz);
  } catch (error) {
    throw error
  }
};

Quiz.getQuizzesByPOI = async (poiId) => {
  try {
    const res = await db.query("SELECT * FROM Quizzes WHERE poi_id = ?", [
      poiId,
    ]);
    return res[0];
  } catch (error) {
    throw error
  }
};

// ----------------------------------------

Quiz.deleteQuiz = async (quizId, result) => {
  try {
    const res = await db.query("DELETE FROM Quizzes WHERE id = ?", [quizId]);
    console.log("deleted quiz with id: ", quizId);
    result(null, res);
  } catch (error) {
    console.log("error: ", error);
    result(error, null);
    return;
  }
};

Quiz.updateQuiz = async (quizId, updatedQuiz, result) => {
  try {
    const res = await db.query("UPDATE Quizzes SET ? WHERE id = ?", [
      updatedQuiz,
      quizId,
    ]);

    console.log("updated quiz with id: ", quizId);
    result(null, res);
  } catch (error) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
};

module.exports = Quiz;
