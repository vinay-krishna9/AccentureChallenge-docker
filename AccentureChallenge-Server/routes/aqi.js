const express = require("express");
const auth = require("../middleware/is-auth");

let router = express.Router();
module.exports = router;

let aqiController = require("../controllers/aqi");

router.get("/aqi", auth, (req, res) => {
  aqiController.findAllCountries(req, res);
});

router.get("/aqiById", auth, (req, res) => {
  aqiController.findOneCountryAQI(req, res);
});
