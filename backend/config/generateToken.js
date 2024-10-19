const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = {
    id: this._id,
    name: this.name,
  };
  console.log("first");
  return jwt.sign({ payload }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = generateToken;
