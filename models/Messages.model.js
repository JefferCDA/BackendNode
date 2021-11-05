const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    topic: {
      type: String,
      required: [true, "topic required"],
    },
    message: {
      type: String,
      required: [true, "The Message shouldn't be empty"],
    },
    userId: {
        type: String,
        required: [true, "user required"],
      }
  });

  module.exports = mongoose.model("Messages", MessageSchema);