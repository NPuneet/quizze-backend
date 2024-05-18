const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/index");
const quizRoutes = require("./routes/quiz");
const express = require("express");
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "server is up and running",
  });
});

app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api", quizRoutes);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  mongoose
    .connect(
      "mongodb+srv://admin:admin@quizze.lfst0qb.mongodb.net/?retryWrites=true&w=majority&appName=quizze"
    )
    .then(() => console.log("mongDB connection successful"))
    .catch((err) => console.error(err));
  console.log(`app listening at Port ${PORT}`);
});
