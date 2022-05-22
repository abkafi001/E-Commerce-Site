const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Wallet",
  new mongoose.Schema(
    {
      owner: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: "User",
      },
      balance: {
        type: Number,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);
