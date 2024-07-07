const UserDao = require("../daos/users");
const UserSessionsDao = require('../daos/userSessions')
const utilSecurity = require("../utils/security");

module.exports = {
  signup,
  getSaltAndIterations,
  loginUser,
};

async function signup(body) {
  const user = await UserDao.findOne({ username: body.username });
  console.log(user);
  if (user) {
    return { success: false, error: "user already exists" };
  }
  const newUser = await UserDao.create(body);
  return { success: true, data: newUser };
}

async function getSaltAndIterations(body) {
  const loginDetailsSchema = {
    "username": 1,
    "salt": 1,
    "iterations": 1,
  };
  console.log(body.username);
  const user = await UserDao.findOne(
    { username: body.username },
    loginDetailsSchema
  );
  console.log(user);
  return { success: true, data: user };
}

async function loginUser(body) {
  // Check the request body for required properties
  if (!body.hasOwnProperty("username")) {
    return { success: false, error: "missing username" };
  }
  if (!body.hasOwnProperty("password")) {
    return { success: false, error: "missing password" };
  }

  // When all properties are present, search Users table for matching values
  const user = await UserDao.findOne({
    username: body.username,
    password: body.password,
  });
  if (user == null || Object.keys(user).length == 0) { // If User does not exist
    return { success: false, error: "Invalid username/password" };
  }

  // Store user_id 
  const userId = user._id

  // Use user_id in payload for jwt
  const jwtPayload = {
    user_id: userId,
  };
  const token = utilSecurity.createJWT(jwtPayload); // Returns a string, after signing
  const expiry = utilSecurity.getExpiry(token);

  // Create new user session
  await UserSessionsDao.create(
    { user_id: userId, token: token, expire_at: expiry },
  );
  return { success: true, data: token };
}
