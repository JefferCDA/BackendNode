const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name required"],
  },
  status: { type: Boolean, default: false },
  email: {
    type: String,
    required: [true, "email required"],
    unique: true,
    match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Email invalid"],
  },
  password: {
    type: String,
    required: [true, "Password required"],
    minlength: 8,
    select: false,
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
UserSchema.methods.validateLogin = async function (passwordUser) {
  return await bcrypt.compare(passwordUser, this.password);
};
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      name: this.name,
      email: this.email,
    },
    process.env.JWT_SECRET_KEY,{
      expiresIn: process.env.JWT_EXPIRE
    }

  );
};

module.exports = mongoose.model("Users", UserSchema);
