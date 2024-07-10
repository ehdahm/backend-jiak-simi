var express = require("express");
var router = express.Router();
var dishesCtrl = require("../controllers/dishes");

/* GET reviews listing. */
router.get("/", dishesCtrl.getReview);

module.exports = router;
