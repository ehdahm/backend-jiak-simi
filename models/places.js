const daoPlace = require("../daos/places");
const modelDishes = require("./dishes");

var ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
  getPlace,
  findOrCreatePlace,
};

async function getPlace(place_id, dish_id) {
  const dish = await modelDishes.getDish(dish_id);
  const placeDetailsSchema = {
    name: 1,
    cuisine: 1,
  };
  const placeID = dish.data.place_id;
  const placeObjectId = new ObjectId(placeID);

  const place = await daoPlace.findOne(
    { _id: placeObjectId },
    placeDetailsSchema,
  );
  return { success: true, data: place };
}

async function findOrCreatePlace(placeName, cuisine) {
  let placeDoc = await daoPlace.findOne({ name: placeName });
  if (!placeDoc) {
    placeDoc = await daoPlace.create({ name: placeName, cuisine });
  }
  return placeDoc;
}
