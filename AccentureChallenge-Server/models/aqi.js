const mongoose = require("mongoose");

const aqiSchema = mongoose.Schema({
  City: { type: String },
  Region: { type: String },
  Country: { type: String },
  Population: { type: String },
  Flag: { type: String },
  AirQuality: { type: String },
});

module.exports = mongoose.model("aqi", aqiSchema, "aqi");
