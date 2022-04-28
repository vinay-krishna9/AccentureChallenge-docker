const express = require("express");

let router = express.Router();
module.exports = router;

let userController = require("../controllers/user");

router.post("/login", (req, res) => {
  userController.login(req, res);
});
