const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
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
    picture: {
      type: String,
      default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timeStamps: true, versionKey: false }
);

userSchema.methods.generateToken = function () {
  const payload = {
    id: this._id,
    name: this.name,
  };

  return jwt.sign({ payload }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

userSchema.methods.matchPassword = async function (enteredpassword) {
  return await bcrypt.compare(enteredpassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
