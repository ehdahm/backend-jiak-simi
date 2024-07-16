var express = require("express");
var router = express.Router();
var placesCtrl = require("../controllers/places");

/* GET place */
router.get("/:place_id/:dish_id", placesCtrl.getPlace);

/* GET getplaceIDbyCuisine */
router.get("/:cuisine", placesCtrl.getplaceIDbyCuisine);

module.exports = router;
