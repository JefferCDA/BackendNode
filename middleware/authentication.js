const ErrorResponse = require("../helper/errorResponse");
const jwt = require("jsonwebtoken");
const User = require("../models/Users.model");

exports.authentication = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ErrorResponse("token required", 400));
  }
  try {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userData = await User.findOne({ email: tokenDecoded.email });
    req.user = userData;
    next();
  } catch (err) {
    return next(new ErrorResponse("token errors" + err, 400));
  }
};
