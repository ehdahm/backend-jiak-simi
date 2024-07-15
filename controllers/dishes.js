const Dishes = require("../models/dishes");

module.exports = {
  fetchAllDishesIDs,
  getDish
};

async function fetchAllDishesIDs(req, res) {
  try {
    // console.log('fetchAllDishesIDs req.body', req.body)
    const allDishesIDs = await Dishes.fetchAllDishesIDs(req.body); 
    // console.log(`allDishesIDs json`, allDishesIDs)
    res.status(200).json(allDishesIDs);
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.status(500).json({ err });
  }
}

async function getDish(req,res){
  try{
    // console.log(`getDish req.params.dish_id`, req.params.dish_id);
    const dish = await Dishes.getDish(req.params.dish_id);
    // console.log(`dish json`, dish)
    res.status(200).json(dish);
  } catch(err){
    console.log(err);
    res.status(500).json({ err });
  }

}


