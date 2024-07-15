const daoDish = require("../daos/dishes");
const daoReview = require("../daos/reviews");

var ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
  getDish,
  getDishID,
  findOrCreateDish,
  updatePrice,
  updateAvgRating,
  fetchAllDishesIDs,
};

async function getDish(dish_id) {
  console.log(`getDish model dish_id`, dish_id)
  let dishDoc = await daoDish.findOne({ _id: dish_id });
<<<<<<< Updated upstream
  console.log('getDish dishDoc', dishDoc);
  return { success: true, data: dishDoc }
}  

async function getDishID(dishName) {
  console.log(`dishName`, dishName)
  let dishDoc = await daoDish.findOne({ name: dishName });
  console.log('getDishID dishDoc', dishDoc);
  return { success: true, data: dishDoc }
}  
=======
  console.log("dishDoc", dishDoc);
  // const review = await modelReview.getDish();
  // // console.log(`review in dishes model: ${review.data.dish_id}`);
  // const dishDetailsSchema = {
  //   name: 1,
  //   place_id: 1,
  // };
  // const dish_id = review.data.dish_id;
  // const dishObjectId = new ObjectId(dish_id);

  // const dish = await daoDish.findOne({ _id: dishObjectId }, dishDetailsSchema);
  // // console.log(`model dishDetailsSchema: ${dish}`);
  return { success: true, data: dishDoc };
}
>>>>>>> Stashed changes

async function findOrCreateDish(dishName, placeId, price) {
  // find dish document
  let dishDoc = await daoDish.findOneAndUpdate(
    { name: dishName, place_id: placeId },
    { latest_price: price },
  );

  // if it doesnt exist, just create the document
  if (!dishDoc) {
    dishDoc = await daoDish.create({
      name: dishName,
      place_id: placeId,
      latest_price: price,
    });
  }

  return dishDoc;
}

async function updatePrice(dishName, placeId, price) {
  return await daoDish.findOneAndUpdate(
    { name: dishName, place_id: placeId },
    { latest_price: price },
  );
}

async function updateAvgRating(dishId) {
  const reviews = await daoReview.find({ dish_id: dishId });
  const ratings = reviews.map((review) => review.rating);
  const avgRating =
    ratings.length > 0 ? ratings.reduce((a, b) => a + b) / ratings.length : 0;

  return await daoDish.findByIdAndUpdate(
    dishId,
    { avg_rating: avgRating },
    { new: true },
  );
}

async function fetchAllDishesIDs() {
  const allDishesIDs = await daoDish.find();
  // console.log(`allDishesIDs`, allDishesIDs);
  return allDishesIDs;
}
