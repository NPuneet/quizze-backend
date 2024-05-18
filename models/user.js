const { default: mongoose } = require("mongoose");
const mongoDB = require("mongoose");
const User = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpass: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("User", User);
