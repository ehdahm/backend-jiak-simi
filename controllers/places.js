const Places = require("../models/places");

module.exports = {
  getPlace,
  getplaceIDbyCuisine,
};

async function getPlace(req, res) {
  try {
    // console.log(`getPlace req.params.place_id`, req.params.place_id)
    // console.log(`getPlace req.params.dish_id`, req.params.dish_id)
    const place = await Places.getPlace(
      req.params.place_id,
      req.params.dish_id
    );
    // console.log(`place json`, place);
    res.status(200).json(place);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
}
async function getplaceIDbyCuisine(req, res) {
  try {
    console.log(`getplaceIDbyCuisine req.params.cuisine`, req.params.cuisine);
    const placeID = await Places.getplaceIDbyCuisine(req.params.cuisine);
    console.log(`getplaceIDbyCuisine json`, placeID);
    res.status(200).json(placeID);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
}
