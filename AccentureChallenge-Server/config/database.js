const mongoose = require("mongoose");

const { MONGO_URI_LOCALDEV } = process.env;

exports.connect = () => {
  mongoose
    .connect(MONGO_URI_LOCALDEV, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};
