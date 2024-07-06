const UserModel = require("../models/users");

module.exports = {
  signup,
  getSaltAndIterations,
  loginUser,
};

async function signup(req, res) {
  try {
    const user = await UserModel.signup(req.body); // Pass request to the model
    res.json(user); // Respond with user input
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
}

async function getSaltAndIterations(req, res) {
  try {
    const user = await UserModel.getSaltAndIterations(req.query);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
}

async function loginUser(req, res) {
  try {
    const token = await UserModel.loginUser(req.body);
    console.log(token);
    if (!token.success) {
      res.status(400).json({ errorMsg: token.error });
      return;
    }
    res.json(token.data);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}
