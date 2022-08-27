require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

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
      password: {
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

    cart: [
      {
        product_id: {
          type: String,
        },
        price: {
          type: Number,
        },
        unit: {
          type: Number,
        },
      },
    ],
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

  console.log("eee: " + process.env.JWT_PRIVATE_KEY);
  return token;
};

module.exports = mongoose.model("User", userSchema);
