const daoReview = require("../daos/reviews");
const modelPlace = require('../models/places')
const modelDish = require('../models/dishes')
const userSessions = require("../daos/userSessions");

var ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
  fetchReviewsByUser,
  createReview,
  findAllByDishId,
};


async function fetchReviewsByUser(userID) {
  try {
    const userObjectId = new ObjectId(userID); // Convert userID to ObjectId
    // console.log(`userID`, userID);
    // console.log(`userObjectId`, userObjectId);

    let reviewDocsByUser = await daoReview.find({ user_id: userObjectId });
console.log(`reviewDocsByUser`, reviewDocsByUser)

// find dish_id from each reviewdoc 
// let dishDocByReview = await(reviewDocsByUser.map((reviewDoc) => (reviewDoc.dish_id)))
// console.log(`dishDocByReview`, dishDocByReview)


//modelPlace.getPlace(reviewDoc.place_id, reviewDoc.dish_id) 
//modelDish.getDish

// let placeDocByDish = await Promise.all(dishDocByReview.map((dishDoc) => (modelPlace.getPlace(reviewDoc.place_id))))
// console.log(`placeDocByDish`, placeDocByDish)

// let placeDocByDish = await modelPlace.getPlace({place_id: dishDocByReview.place_id});
   
// let altogether = {reviewDocsByUser, dishDocByReview, placeDocByDish}
// console.log(`altogether is`, altogether)

    // console.log(`reviewDocsByUser json`, JSON.stringify(reviewDocsByUser));

//find dish and food from modelDish.getDish(reviewDocsByUser.dish_id) to return dishDoc. 
// dishDoc - name, place_id
// append to reviewDocsByUser

    return { success: true, data: reviewDocsByUser };
  } catch (error) {
    console.error("Error fetching reviews by user:", error);
    return { success: false, error: error.message }; // Return error object
  }
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