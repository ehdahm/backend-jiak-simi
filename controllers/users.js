const UserModel = require("../models/users");

module.exports = {
  signup,
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
