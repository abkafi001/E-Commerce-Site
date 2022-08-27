require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
      min: 6,
      max: 100,
    },

    password: {
      type: String,
      required: true,
      max: 1024,
    },

    balance: {
      type: Number,
      min: 0,
      default: 100,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      balance: this.balance,
    },
    process.env.JWT_PRIVATE_KEY
  );

  return token;
};

module.exports = mongoose.model("User", userSchema);
