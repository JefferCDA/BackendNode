const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const connectDatabase = require("./config/db");
const errorHandler = require('./middleware/error');

dotenv.config({ path: "./config/config.env" });
connectDatabase();

const user = require("./routes/users.route");

const app = express();
app.use(express.json());

if (process.env.NODE_env === "development") {
  app.use(morgan("dev"));
}

app.use("/api", user);

app.use(errorHandler);

const PORT = process.env.PORT | 5000;

const server = app.listen(PORT, () => {
  console.log("Server running on Environment ", process.env.NODE_env);
});

process.on("unhandledRejection", (err, Promise) => {
  console.log("Errors: ", err.message);
  server.close(() => process.exit(1));
});