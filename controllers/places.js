const Places = require("../models/places");

module.exports = {
  getPlace,
};

async function getPlace(req, res) {
  try {
<<<<<<< Updated upstream
    // console.log(`getPlace req.params.place_id`, req.params.place_id)
    // console.log(`getPlace req.params.dish_id`, req.params.dish_id)
    const place = await Places.getPlace(req.params.place_id, req.params.dish_id); 
    // console.log(`place json`, place);
=======
    console.log(`getPlace req.params.place_id`, req.params.place_id);
    console.log(`getPlace req.params.dish_id`, req.params.dish_id);
    const place = await Places.getPlace(
      req.params.place_id,
      req.params.dish_id,
    );
    console.log(`place json`, place);
>>>>>>> Stashed changes
    res.status(200).json(place);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
}
