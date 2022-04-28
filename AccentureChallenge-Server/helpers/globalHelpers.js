const jwt = require("jsonwebtoken");

exports.userToken = (userId) => {
  const payload = { _id: userId };
  let token = jwt.sign(payload, process.env.SECRET);
  return token;
};
