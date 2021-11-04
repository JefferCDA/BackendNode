const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    topic: {
      type: String,
      required: [true, "topic required"],
    },
    message: String,
    userId: {
        type: String,
        required: [true, "user required"],
      }
  });