require("dotenv").config();
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    ammount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);
