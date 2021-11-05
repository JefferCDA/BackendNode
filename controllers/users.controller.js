const User = require("../models/Users.model");
const errorResponse = require("../helper/errorResponse");

exports.createUser = async (req, res, next) => {
  try {
    const { name, lastName, email, password } = req.body;
    const userData = await User.create({
      name,
      lastName,
      email,
      password,
    });

    res.status(200).json({
      status: 200,
      userId: userData._id,
    });
  } catch (err) {
    next(
      new errorResponse("it wasn't possible to process request: " + err, 400)
    );
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

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new errorResponse("Email and password required"));
    }
    const userData = await User.findOne({ email }).select("+password");
    if (!userData) {
      return next(new errorResponse("User email don't exist", 400));
    }

    const validUser = await userData.validateLogin(password);
    if (!validUser) {
      return next(new errorResponse("Incorrect password", 400));
    } else {
      const token = userData.createJWT();
      res.status(200).json({
        status: 200,
        userId: userData._id,
        token,
      });
    }
  } catch (err) {
    next(new errorResponse("Login error :" + err, 400));
  }
};
exports.logout = (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    jwtr.destroy(token);

    res.status(200).json({
      status: 200,
      message: "Logout "
    });
    next();
  } catch (err) {
    return next(new errorResponse("token errors" + err, 400));
  }
};