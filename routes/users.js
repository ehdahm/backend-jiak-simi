var express = require("express");
var router = express.Router();
const UserController = require("../controllers/users");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// POST signup users
router.post("/signup", UserController.signup);

module.exports = router;
