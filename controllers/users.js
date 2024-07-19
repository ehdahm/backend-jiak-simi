const UserModel = require("../models/users");

module.exports = {
  signup,
  getSaltAndIterations,
  loginUser,
  logoutUser,
  getUsername,
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

async function logoutUser(req, res) {
  try {
    const result = await UserModel.logoutUser(req.body);
    console.log("result", result);
    if (!result.success) {
      res.status(400).json({ errorMsg: result.error });
      return;
    }
    res.json(result.data);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

async function getUsername(req, res) {
  try {
    console.log(req.params.user_id);
    const userId = req.params.user_id;
    console.log("userId", userId);
    const user = await UserModel.getUsername(userId);
    console.log("user", user);
    if (!user) {
      res.status(404).json({ errorMsg: "User not found" });
      return;
    }
    res.json({ username: user });
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

async function getReviewsForDish(req, res) {
  try {
    const dishId = req.params.dish_id;
    console.log(dishId);
    const reviews = await Review.findAllByDishId(dishId);
    console.log(reviews);
    res.status(200).json(reviews);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}
