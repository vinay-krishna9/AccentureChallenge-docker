const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String, min: 8 },
  token: { type: String },
});

module.exports = mongoose.model("users", userSchema);
