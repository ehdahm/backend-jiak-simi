var express = require("express");
var router = express.Router();
var placesCtrl = require("../controllers/places");

/* GET reviews listing. */
router.get("/", placesCtrl.getReview);

module.exports = router;
