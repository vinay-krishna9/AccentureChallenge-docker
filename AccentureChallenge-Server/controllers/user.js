const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const { userToken } = require("../helpers/globalHelpers");
require("dotenv").config();

let saltRounds = 10;

exports.login = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res
        .status(400)
        .json({ message: "please pass a proper Email id and password" });
    }

    userModel.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) {
        res.status(404).json({ message: "User Not Found" });
      } else if (user === null || user === {}) {
        let user = userModel({
          email: email.toLowerCase(),
          password: bcrypt.hashSync(password, saltRounds),
        });
        user.save((err, userData) => {
          if (err) {
            return res.status(404).json({ message: "User exists" });
          } else {
            let token = userToken(user._id);
            res.status(200).json({
              token,
            });
          }
        });
      } else if (bcrypt.compareSync(password, user.password)) {
        let token = userToken(user._id);
        res.status(200).json({
          token,
        });
      } else {
        res.status(400).json({ message: "Incorrect Credentials" });
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
