const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nombre requerido"],
  },
  lastName: {
    type: String,
    required: [true, "Apellido requerido"],
  },
  status: { type: Boolean, default: false },
  email: {
    type: String,
    required: [true, "email requerido"],
    unique: true,
    match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Correo electronico inválido"],
  },
  password: {
    type: String,
    required: [true, "Contraseña requerida"],
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
    process.env.JWT_SECRET_KEY
  );
};

module.exports = mongoose.model("Users", UserSchema);
