const mongoose = require("mongoose");

module.exports = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 100,
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
  )
);
