const Reviews = require("../models/reviews");

module.exports = {
  // getReview,
  createReview,
};

// async function getReview(req, res) {
//   try {
//     console.log('getReview req.body', req.body)
//     const review = await Reviews.getReview(req.body); // pass req to model //respond with review input
//     console.log("review json:", review);
//     res.status(200).json(review);
//   } catch (err) {
//     // Typically some sort of validation error
//     console.log(err);
//     res.status(500).json({ err });
//   }
// }

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
