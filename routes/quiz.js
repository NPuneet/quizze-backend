const express = require("express");
const router = express.Router();

const {
  deleteQuiz,
  getAllQuiz,
  getQuizById,
  CreateQuiz,
} = require("../controllers/quiz.js");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
router.post("/quiz", CreateQuiz);
router.delete("/quiz/:id", deleteQuiz);
router.get("/quiz/:id", getQuizById);
router.get("/quiz", getAllQuiz);

module.exports = router;
