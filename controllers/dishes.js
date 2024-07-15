const Dishes = require("../models/dishes");
const Review = require("../models/reviews");

module.exports = {
  fetchAllDishesIDs,
  getDish,
  getReviewsForDish,
};

async function fetchAllDishesIDs(req, res) {
  try {
    console.log("fetchAllDishesIDs req.body", req.body);
    const allDishesIDs = await Dishes.fetchAllDishesIDs(req.body);
    // console.log(allDishesIDs json, allDishesIDs)
    res.status(200).json(allDishesIDs);
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.status(500).json({ err });
  }
}

async function getDish(req, res) {
  try {
    const dish = await Dishes.getDish(req.params.dish_id);
    res.status(200).json(dish);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
}

async function getReviewsForDish(req, res) {
  try {
    const dishId = req.params.dish_id;
    console.log(dishId)
    const reviews = await Review.findAllByDishId(dishId);
    console.log(reviews)
    res.status(200).json(reviews); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message }); 
  }
}