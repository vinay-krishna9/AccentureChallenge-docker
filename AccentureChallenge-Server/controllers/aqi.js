const aqiModel = require("../models/aqi");

exports.findAllCountries = (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const pageSize = 10;
    aqiModel
      .find({}, (err, data) => {
        if (err) {
          res.status(404).json({ message: "Data unavailable" });
        }
        aqiModel.countDocuments({}, (err, count) => {
          if (err) {
            res.status(404).json({ message: "Data unavailable" });
          }
          var totalPages = Math.ceil(count / pageSize);
          res.status(200).json({
            pageSize: pageSize,
            page: page,
            total: totalPages,
            data: data,
          });
        });
      })
      .limit(pageSize)
      .skip(pageSize * page);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.findOneCountryAQI = (req, res) => {
  try {
    aqiModel.findOne({ _id: req.query.aqiId }, (err, data) => {
      if (err) {
        res.status(404).json({ message: "Data unavailable" });
      }
      res.status(200).json({ data });
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
