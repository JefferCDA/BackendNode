const express = require('express');
const route = express.Router();

route.get("/api/users", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "process",
  });
});
