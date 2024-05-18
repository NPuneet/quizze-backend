const quiz = require("../models/quiz");

const errorHandler = (res, error) => {
  console.error(error);
  res.status(500).json({ error: "Internal Server Error" });
};

const deleteQuiz = async (req, res) => {
  try {
    const quizs = await quiz.findById(req.params.id);
    if (!quizs) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    await quizs.deleteOne({ _id: req.params.id });
    res.json({ message: "Quiz deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
const getAllQuiz = async (req, res) => {
  try {
    const data = await quiz.find({});
    res.json(data);
  } catch (error) {
    errorHandler(res, error);
  }
};
const getQuizById = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const data = await quiz.findById(id);
    if (data) {
      data.impressions += 1;
      await data.save();
      res.json(data);
    } else {
      res.status(404).json({ error: "data not found" });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};
const CreateQuiz = async (req, res) => {
  try {
    const { quizName, quizType, questions, CreatedAt, impressions } = req.body;
    const ques = new quiz({
      quizName,
      quizType,
      questions,
      CreatedAt,
      impressions,
    });
    await ques.save();
    res.json(ques);
  } catch (error) {
    errorHandler(res, error);
  }
};
module.exports = {
  deleteQuiz,
  CreateQuiz,
  getQuizById,
  getAllQuiz,
};
