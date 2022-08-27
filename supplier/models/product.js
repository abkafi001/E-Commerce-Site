require("dotenv").config();
const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Product",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      supplier: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: "Supplier",
      },
      description: {
        type: String,
      },
      category: {
        type: String,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        data: Buffer,
        contentType: String,
      },
      unit: {
        type: Number,
        min: 0,
        default: 10,
      },
    },
    {
      timestamps: true,
    }
  )
);
