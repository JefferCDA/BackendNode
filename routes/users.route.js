const express = require("express");
const route = express.Router();

const {
  createUser,
  updateUser,
  deleteUser,
  activeUser,
  getIsUserActive,
  login,
  logout,
} = require("../controllers/users.controller");

const { sendMessage } = require("../controllers/messages.controller");
const { authentication } = require("../middleware/authentication");


route.route("/users")
  .post(createUser);

route
  .route("/users/:id")
  .put(authentication, updateUser)
  .delete(authentication, deleteUser)
  .get(authentication, getIsUserActive);

route.route("/users/:id/active")
  .patch(authentication ,activeUser);

route.route("/authorization")
  .post(login)
  .delete(authentication, logout);

route.route("/messages/send")
  .post(authentication, sendMessage);
module.exports = route;
