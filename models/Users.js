const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  charName:{
    type: String,
    required: true,
  },
  picture:{
    type:Buffer
  }
});

module.exports = mongoose.model("user", UserSchema);
