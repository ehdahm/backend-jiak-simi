var express = require("express");
var router = express.Router();
const UserController = require("../controllers/users");
const securityMiddleware = require('../middlewares/security')

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// POST signup users
router.post("/signup", UserController.signup);

router.get("/login", UserController.getSaltAndIterations); // GET returns user salt and iterations from db
router.post("/login", UserController.loginUser); // POST jwt_token to db, returns token

// POST logout user
router.post("/logout", UserController.logoutUser);

module.exports = router;
