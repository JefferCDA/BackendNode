const User = require("../models/Users.model");
const errorResponse = require("../helper/errorResponse");
exports.createUser = async (req, res, next) => {
  try {
    const userData = await User.create(req.body);
    res.status(200).json({
      status: 200,
      userId: userData._id,
    });
  } catch (err) {
    next(err);
  }
};
exports.updateUser = async (req, res, next) => {
  try {
    const userData = await User.findByIdAndUpdate(req.params.id, req.body);
    if (!userData) {
      return next(new errorResponse("User doesn't exist", 400));
    }
    res.status(200).json({
      status: 200,
      data: userData,
    });
  } catch (err) {
    next(err);
  }
};
exports.deleteUser = async (req, res, next) => {
  try {
    const userData = await User.findByIdAndDelete(req.params.id);
    if (!userData) {
      return next(new errorResponse("User doesn't exist", 400));
    }
    res.status(200).json({
      status: 200,
    });
  } catch (err) {
    next(err);
  }
};
exports.activeUser = async (req, res, next) => {
  try {
    const userData = await User.findByIdAndUpdate(req.params.id, req.body);
    if (!userData) {
      return next(new errorResponse("User doesn't exist", 400));
    }
    res.status(200).json({
      status: 200,
    });
  } catch (err) {
    next(err);
  }
};
exports.getIsUserActive = async (req, res, next) => {
  try {
    const userData = await User.findById(req.params.id);
    if (userData.status === true) {
      res.status(200).json({
        status: 200,
        data: userData,
      });
    } else {
      return next(new errorResponse("This user is not active", 405));
    }
  } catch (err) {
    next(err);
  }
};
