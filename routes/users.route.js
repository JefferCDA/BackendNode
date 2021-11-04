const express = require("express");
const route = express.Router();
const {auth}  = require("../middleware/authentication");

const {
  createUser,
  updateUser,
  deleteUser,
  activeUser,
  getIsUserActive,
  login,
  logout,
} = require("../controllers/users.controller");

route.route("/users").post(createUser);

route
  .route("/users/:id")
  .put(updateUser)
  .delete(deleteUser)
  .get(getIsUserActive);

route.route("/users/:id/active").patch(activeUser);

route.route("/authorization").post(login).delete(logout);

module.exports = route;
