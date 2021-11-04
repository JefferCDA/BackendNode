const express = require("express");
const route = express.Router();

const {
  createUser,
  updateUser,
  deleteUser,
  activeUser,
  isUserActive,
} = require("../controllers/users.controller");

route.route("/")
    .post(createUser);

route.route("/:id")
    .put(updateUser)
    .delete(deleteUser)
    .get(isUserActive);

route.route("/:id/active")
    .patch(activeUser);

module.exports = route;
