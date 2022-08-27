const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Order",
  new mongoose.Schema(
    {
      buyer: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: "User",
      },
      txId: {
        type: String,
        required: true,
      },
      products: [
        {
          product_id: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          unit: {
            type: Number,
          },
        },
      ],
      state: {
        type: String, // "PENDING", "SHIPPED"
      },
    },
    {
      timestamps: true,
    }
  )
);
