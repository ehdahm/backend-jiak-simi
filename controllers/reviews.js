const Reviews = require("../models/reviews");

module.exports = {
  getReview,
};

async function getReview(req, res) {
  try {
    const review = await Reviews.getReview(req.body); // pass req to model //respond with review input
    // console.log(`CONTROLLER REVIEWS: ${JSON.stringify(review)}`);
    console.log("Request body:", req.body);

    res.status(200).json(review);
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.status(500).json({ err });
  }
}
