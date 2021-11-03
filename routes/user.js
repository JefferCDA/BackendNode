const express = require('express');
const route = express.Router();

route.put("/:id", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "process",
  });
});

route.delete("/:id", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "process",
  });
});

route.patch("/:id", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "process",
  });
});

route.get("/:id", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "process",
  });
});


module.exports= route;