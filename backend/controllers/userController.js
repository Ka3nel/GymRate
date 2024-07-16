const User = require("../models/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//login user
const loginUser = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    const user = await User.login(emailOrUsername, password);

    //create a token
    const token = createToken(user._id);

    res.status(200).json({ ...user._doc, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup user
const signupUser = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const user = await User.signup(email, username, password);

    //create a token
    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get an user
const getUser = async (req, res) => {
  const { id } = req.params;

  //not a valid object id (done to avoid a crash)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }

  res.status(200).json(user);
};

module.exports = { signupUser, loginUser, getUser };
