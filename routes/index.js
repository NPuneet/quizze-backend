const dotenv = require("dotenv");
const express = require("express");
const { login, register } = require("../controllers/user");
dotenv.config();
const router = express.Router();
router.post("/login", login);
router.post("/register", register);
module.exports = router;
