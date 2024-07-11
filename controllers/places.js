const Places = require("../models/places");

module.exports = {
  getReview,
};

async function getReview(req, res) {
  try {
    const places = await Places.getReview(req.body); // pass req to model
    // console.log(`CONTROLLER PLACES: ${JSON.stringify(places)}`);
    res.status(200).json(places);
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.status(500).json({ err });
  }
}
