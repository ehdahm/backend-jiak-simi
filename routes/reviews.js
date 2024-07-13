var express = require("express");
var router = express.Router();
var reviewsCtrl = require("../controllers/reviews");
var securityMiddleware = require('../middlewares/security')

/* GET one review */
// router.get("/", reviewsCtrl.getReview);

// POST new review 
router.post("/new", reviewsCtrl.createReview); // currently passing token through the body, might change it to params

// GET review by user 
router.get("/:user_id", reviewsCtrl.fetchReviewsByUser); 

module.exports = router;
