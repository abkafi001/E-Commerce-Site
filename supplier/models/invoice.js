const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    order_id: {
      type: String,
      required: true,
    },
    buyer: {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
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
    total_price: {
      type: Number,
    },
    state: {
      type: String, // "PENDING", "SHIPPED"
    },
  },
  {
    timestamps: true,
  }
);

invoiceSchema.pre("save", async function (next) {
  let total_price = 0;

  for ({ price, unit } of this.products) {
    total_price += price * unit;
  }

  this.total_price = total_price;

  next();
});

module.exports = mongoose.model("Invoice", invoiceSchema);
