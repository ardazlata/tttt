const AnswerModel = require("../Models/answerModel");
const db = require("../Config/dbConfig");
const QuizModel = require("../Models/quizModel");
const UserPoi = require("../Models/userPoiModel");


exports.submitCompleteQuiz = async (req, res) => {
  const userId = req.userId;
  const { poiId, answers } = req.body;
  // --------------------------------------------------
  // each check answer to be inserted in the database
  answers.map(async (answer) => {
    const obj = {
      user_id: userId,
      quiz_id: answer.quiz_id,
      selected_option: answer.selected_option,
    };
    await AnswerModel.submitAnswer(obj);
  });
  // --------------------------------------------------
  // get  questions related to the current point
  const quizes = await QuizModel.getQuizzesByPOI(poiId);
  if(quizes.length===0){
    res.status(200).json({message:"This point has no questions yet"})
    return;
  }
  let score = 0;
      answers.forEach((answer, index) => {
      const answerByUser = answer.selected_option; 
      if (quizes[index].correct_option === answerByUser) {
        score++;
      }
    });
    await UserPoi.createUserPOI(poiId, userId, score);
  res.status(200).json({ message: "Answers submitted successfully",score,"total questions":quizes.length },);
};
