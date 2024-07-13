const Reviews = require("../models/reviews");

module.exports = {
  fetchReviewsByUser,
  createReview,
};

async function fetchReviewsByUser(req, res) {
  try {
    console.log('fetchReviewsByUser req.params.user_id', req.params.user_id)
    const reviewsByUser = await Reviews.fetchReviewsByUser(req.params.user_id); // pass req to model //respond with review input
    console.log("reviewsByUser json:", reviewsByUser);
    res.status(200).json(reviewsByUser);
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.status(500).json({ err });
  }
}

async function createReview(req, res) {
  try {
    console.log('createReview req.body', req.body)
    const newReview = await Reviews.createReview(req.body)
    console.log('newReview json', newReview)
    res.json(newReview)
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
}
