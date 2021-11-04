const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name     : {
    type: String,
    required: [true, 'Nombre requerido']
  },
  lastName : {
    type: String,
    required: [true, 'Apellido requerido']
  },
  status   : { type: Boolean, default: false },
  email    : {
    type: String,
    required: [true, 'email requerido'],
    unique: true,
    match : [
      /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Correo electronico inválido'
    ]
  },
  password :{
    type: String,
    required: [true, 'Contraseña requerida'],
    minlength: 8,
    select: false
  },
});

module.exports = mongoose.model('Users', UserSchema);