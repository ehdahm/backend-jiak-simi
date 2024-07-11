const daoDish = require("../daos/dishes");
const modelReview = require("./reviews");

var ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
  getReview,
};

async function getReview() {
  const review = await modelReview.getReview();
  // console.log(`review in dishes model: ${review.data.dish_id}`);
  const dishDetailsSchema = {
    name: 1,
    place_id: 1,
  };
  const dish_id = review.data.dish_id;
  const dishObjectId = new ObjectId(dish_id);

  const dish = await daoDish.findOne({ _id: dishObjectId }, dishDetailsSchema);
  // console.log(`model dishDetailsSchema: ${dish}`);

  // const placeDetailsSchema = {
  //   name: 1, //change to name from daoDish and place from daoPlaces from dishID
  // };

  // const place = await daoPlace.findOne(
  //   { dish_id: dish.dish_id },
  //   placeDetailsSchema
  // );
  // console.log(
  //   `model: ${review.price},${review.rating}, ${dish.name}, ${place.name}`
  // );
  return { success: true, data: dish };
}

//use dish_id from daoReview to find name + places_id in daoDish. Then use places_id from dishDao to find name in placeDao. Create constant to return object with dish@eatery, price, review
//random reviews (getall to return array of _id in reviews, then math.random to choose one )

// const allReviews = await daoReview.find({ _id: objectId }, reviewDetailsSchema);
// let randomID = allReviews[math.floor(math.random(allReviews.length))];
