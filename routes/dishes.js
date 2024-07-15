var express = require("express");
var router = express.Router();
var dishesCtrl = require("../controllers/dishes");

/* GET all dishes */
router.get("/", dishesCtrl.fetchAllDishesIDs);

/* GET each dish listing. */
router.get("/:dish_id", dishesCtrl.getDish);

/* GET all reviews for dish */
router.get("/:dish_id/reviews", dishesCtrl.getReviewsForDish);

module.exports = router;