const dotenv = require("dotenv");
const express = require("express");
const jwt = require("jsonwebtoken");
const mqtt = require("mqtt");
const serverMqtt = mqtt.connect("mqtt://test.mosquitto.org");

const user = require("./routes/user");

dotenv.config({ path: "./config/config.env" });
const app = express();

app.use("/api/users", user);

const PORT = process.env.PORT | 5000;

const server = app.listen(PORT, () => {
  console.log("Server running on Environment ", process.env.NODE_env);
});

process.on("unhandledRejection", (err, Promise) => {
  console.log("Errors: ", err.message);
  server.close(() => process.exit(1));
});
