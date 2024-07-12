const daoPlace = require("../daos/places");
const modelDishes = require("./dishes");

var ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
  getReview,
  findOrCreatePlace,
};

async function getReview() {
  const dish = await modelDishes.getReview();
  // console.log(`place in dishes model: ${dish.data.place_id}`);
  const placeDetailsSchema = {
    name: 1,
    cuisine: 1,
  };
  const place_id = dish.data.place_id;
  const placeObjectId = new ObjectId(place_id);

  const place = await daoPlace.findOne(
    { _id: placeObjectId },
    placeDetailsSchema
  );
  // console.log(`model placeDetailsSchema: ${place}`);

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
  return { success: true, data: place };
}

//use dish_id from daoReview to find name + places_id in daoDish. Then use places_id from dishDao to find name in placeDao. Create constant to return object with dish@eatery, price, review
//random reviews (getall to return array of _id in reviews, then math.random to choose one )

// const allReviews = await daoReview.find({ _id: objectId }, reviewDetailsSchema);
// let randomID = allReviews[math.floor(math.random(allReviews.length))];

async function findOrCreatePlace(placeName, cuisine) {
  let placeDoc = await daoPlace.findOne({ name: placeName });
  if (!placeDoc) {
    placeDoc = await daoPlace.create({ name: placeName, cuisine });
  }
  return placeDoc;
}