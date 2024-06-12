const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const validate = await bcrypt.compare(password, user.password);
    if (!validate) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ success: true, token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
};

exports.register = async (req, res) => {
  const { name, email, password, confirmpass } = req.body;
  try {
    if (!name || !email || !password || !confirmpass) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (password !== confirmpass) {
      return res
        .status(400)
        .json({ error: "Password and confirm password do not match" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmPassword = await bcrypt.hash(confirmpass, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      confirmpass: hashedConfirmPassword,
    });
    await user.save();
    const token = jwt.sign({ user: user.email }, process.env.JWT_SECRET_KEY);
    res.json({ success: true, token, user: email, name: name });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};
