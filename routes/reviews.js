var express = require("express");
var router = express.Router();
var reviewsCtrl = require("../controllers/reviews");

// POST new review
router.post("/new", reviewsCtrl.createReview); // currently passing token through the body, might change it to params

// POST update review 
router.post("/update", reviewsCtrl.updateReview); // currently passing token through the body, might change it to params

// GET review by ID 
router.get("/reviewid/:review_id", reviewsCtrl.getReview); 

// GET review by user 
router.get("/userid/:user_id", reviewsCtrl.fetchReviewsByUser); 

module.exports = router;
