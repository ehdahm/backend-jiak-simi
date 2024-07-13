const daoDish = require("../daos/dishes");
const daoReview = require("../daos/reviews");

var ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
  getDish,
  findOrCreateDish,
  updatePrice,
  updateAvgRating,
  fetchAllDishesIDs
};

async function getDish(dish_id) {
  console.log(`getDish model dish_id`, dish_id)
  let dishDoc = await daoDish.findOne({ _id: dish_id });
  console.log('getDish dishDoc', dishDoc);
  return { success: true, data: dishDoc }
}  

async function findOrCreateDish(dishName, placeId, price) {
  let dishDoc = await daoDish.findOne({ name: dishName, place_id: placeId });
  console.log('dishDoc', dishDoc);
  if (!dishDoc) {
    dishDoc = await daoDish.create({ name: dishName, place_id: placeId, price });
  } else if (price !== undefined && dishDoc) {
    // updates the dish price if a price is entered, so i get latest price
    dishDoc = await updatePrice(dishName, placeId, price);
  }
  console.log('findOrCreateDish', dishDoc)
  return dishDoc;
}

async function updatePrice(dishName, placeId, price) {
  return await daoDish.findOneAndUpdate({ name: dishName, place_id: placeId },{latest_price: price})
}

async function updateAvgRating(dishId) {
  const reviews = await daoReview.find({ dish_id: dishId });
  const ratings = reviews.map(review => review.rating);
  const avgRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b) / ratings.length : 0;
  
  return await daoDish.findByIdAndUpdate(dishId, { avg_rating: avgRating }, { new: true });
}

async function fetchAllDishesIDs(){
  const allDishesIDs = await daoDish.find();
  // console.log(`allDishesIDs`, allDishesIDs);
  return allDishesIDs
}
