const Dishes = require("../models/dishes");

module.exports = {
  getReview,
};

async function getReview(req, res) {
  try {
    const dishes = await Dishes.getReview(req.body); // pass req to model
    // console.log(`CONTROLLER DISHES: ${JSON.stringify(dishes)}`);
    res.status(200).json(dishes);
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.status(500).json({ err });
  }
}
