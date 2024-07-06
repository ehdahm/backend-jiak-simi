const UserDao = require("../daos/users");
// const utilSecurity = require("../utils/security");

module.exports = {
  signup,
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
