const daoReview = require("../daos/reviews");
const modelPlace = require('../models/places')
const modelDish = require('../models/dishes')
const daoPlace = require("../daos/places");
const daoDish = require("../daos/dishes");
const userSessions = require("../daos/userSessions");

var ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
  getReview,
  createReview,
  findAllByDishId,
};

async function getReview() {
  const reviewDetailsSchema = {
    dish_id: 1,
    price: 1,
    rating: 1,
  };
  // Check the type and value of user_idno
  // console.log(`Type of user_idno: ${typeof user_idno}`);
  // console.log(`user_idno: ${user_idno}`);

  // const placeDetailsSchema = {
  //   name: 1, //change to name from daoDish and place from daoPlaces from dishID
  // };

  const review_id = "6688f49c8377c192f239c822";
  const objectId = new ObjectId(review_id);

  const review = await daoReview.findOne(
    { _id: objectId },
    reviewDetailsSchema
  );
  // console.log(`model reviewdetailschema: ${review}`);

  // const place = await daoPlace.findOne(
  //   { dish_id: dish.dish_id },
  //   placeDetailsSchema
  // );
  // console.log(
  //   `model: ${review.price},${review.rating}, ${dish.name}, ${place.name}`
  // );
  return { success: true, data: review };
}

async function findAllByDishId(dishId) {
  return await daoReview.find({ dish_id: dishId });
}

async function createDishReview(dish, dishId, userId) {
  return await daoReview.create({
    name: dish.dish,
    comment: dish.comments,
    price: dish.price,
    rating: dish.rating,
    dish_id: dishId,
    user_id: userId
  });
}


//use dish_id from daoReview to find name + places_id in daoDish. Then use places_id from dishDao to find name in placeDao. Create constant to return object with dish@eatery, price, review
//random reviews (getall to return array of _id in reviews, then math.random to choose one )

// const allReviews = await daoReview.find({ _id: objectId }, reviewDetailsSchema);
// let randomID = allReviews[math.floor(math.random(allReviews.length))];

// there will be a few steps required to create a review
async function createReview(body) {
  try {
    // destructure the inputs
    const { token, place, cuisine, dishes } = body;
    
    console.log('dishes', dishes)
    // find user who is adding the review
    let userSessionDoc = await userSessions.findOne({token})
    console.log(userSessionDoc.user_id)

    // check if theres a place, if not create it
    let placeDoc = await modelPlace.findOrCreatePlace(place, cuisine); // returns obj
    
    console.log('placeDoc', placeDoc)
    console.log('placeDocId', placeDoc._id)
    // check if theres a dish, if not create it
    // update the dishes with the latest price
    let dishDocs = await Promise.all(dishes.map(dish => 
      modelDish.findOrCreateDish(dish.name, placeDoc._id, dish.price)
    )); // returns arr
    console.log(dishDocs)
    
    // create the review
    let reviewDocs = await Promise.all(dishes.map((dish, index) => // returns arr 
      createDishReview(dish, dishDocs[index]._id, userSessionDoc.user_id)
    ));

    // update the ratings
    let updatedDishDocs = await Promise.all(dishDocs.map(dishDoc => 
      modelDish.updateAvgRating(dishDoc._id)
    ));
   
    // merge responses
    const data = {placeDoc, dishDocs, updatedDishDocs, reviewDocs}
    console.log(data)
    return {success : true, data}
  } catch (error) {
    console.error('Error in createReview:', error);
    throw {success : false, error};
  }
}