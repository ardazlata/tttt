const db = require("../Config/dbConfig");

const Answer = {};

// Create Answer related to a question
Answer.submitAnswer = async (newAnswer) => {
  try {
    // const obj = {
    //   user_id: userId,
    //   quiz_id: answer.quiz_id,
    //   selected_option: answer.selected_option,
    // };
    // const alreadyAnswered = await db.query()
    //====================================
    // no update for old just insert new 
    //====================================
    await db.query(
      "INSERT INTO Answers (quiz_id,user_id,selected_option) VALUES (?)",
      [[newAnswer.quiz_id, newAnswer.user_id, newAnswer.selected_option]]
    );
  } catch (error) {
    throw error;
  }
};
// this can be useful for calculating total score of the user
Answer.getAnswersByUser = async (userId) => {
  try {
    const res = await db.query("SELECT * FROM Answers WHERE user_id = ?", [
      userId,
    ]);
    console.log("answers: ", res);
    return res[0];
  } catch (error) {
    console.log("error: ", error);
    throw new Error(error);
  }
};
Answer.getAnswersPerQuiz = async (userId, result) => {
  try {
    const res = await db.query(`SELECT * FROM answer WHERE user_id = '${userId}'
    AND question_id IN (
        SELECT id
        FROM question
        WHERE Poi_id = `);
    console.log("answers: ", res);
    result(null, res);
  } catch (error) {}
};

module.exports = Answer;
