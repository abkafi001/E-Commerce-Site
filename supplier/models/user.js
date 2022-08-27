require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 100,
    },

    bank_cred: {
      account_no: {
        type: String,
      },
    },

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
      name: this.name,
    },
    process.env.JWT_PRIVATE_KEY
  );

  return token;
};

module.exports = mongoose.model("User", userSchema);
