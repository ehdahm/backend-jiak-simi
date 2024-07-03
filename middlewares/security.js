const utilSecurity = require("../utils/security")
const DaoUsers = require('../daos/users');

module.exports = {
    checkJWT,
    checkLogin,
    checkPermission
};

async function checkJWT(req, res, next) {
    // Check for the token being sent in a header or as a query parameter
    let token = req.get("Authorization") || req.query.token;
    if (token) {
      token = token.replace("Bearer ", "");
      const tokenUser = await DaoUsers.findOne({"token": token})
        if (tokenUser == null || Object.keys(tokenUser).length == 0) {
          console.log("no token found!")
            req.user = null;
            return next();
        }
        req.user = utilSecurity.verifyJWT(token);
    } else {
      // No token was sent
      req.user = null;
    }
    return next();
  };
  

// check if they are login
function checkLogin(req, res, next) {
    // Status code of 401 is Unauthorized
    if (!req.user) return res.status(401).json("Unauthorized");
    // A okay
    next();
  };

// check if they are owner or if they are admin
function checkPermission(req, res, next) {
    // Status code of 401 is Unauthorized
    if (!req.user) return res.status(401).json("Unauthorized");
    // if you are not the owner and you are not admin -> unauthorized
    if (req.body.email != req.user.email && req.user.is_admin == false) return res.status(401).json("Unauthorized"); 
    next();
  };
