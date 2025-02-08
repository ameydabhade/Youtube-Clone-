const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.send({ name, email, token, userId: user._id });
  } catch (error) {
    res.status(500).send({
      error: "Registration failed",
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || password !== user.password) {
      return res.status(422).send({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.send({
      name: user.name,
      email: user.email,
      token,
      userId: user._id,
    });
  } catch (error) {
    res.status(500).send({
      error: "Login failed",
      message: error.message,
    });
  }
};
