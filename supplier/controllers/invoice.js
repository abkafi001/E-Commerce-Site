const fetch = require("node-fetch");
const Invoice = require("../models/invoice");
const Product = require("../models/product");

const buy = async (req, res) => {
  try {
    //' To be implemented
    const { order_id, buyer, txId, products } = req.body;

    console.log(products[0]);

    const invoice = new Invoice({
      order_id: order_id,
      buyer: {
        name: buyer.name,
        email: buyer.email,
      },
      txId: txId,
      products: products,
      state: "PENDING",
    });

    invoice.save();

    console.log({ invoice });

    res.status(200).json(invoice);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

const ship = async (req, res) => {
  try {
    const id = req.body.id;

    const invoice = await Invoice.findOne({ _id: id }).exec();

    await Invoice.updateOne(
      { _id: id },
      {
        state: "SHIPPED",
      },
      {
        new: true,
      }
    ).exec();

    for (product of invoice.products) {
      const id = product.product_id;
      const unit = product.unit;

      console.log({ unit });
      await Product.findOneAndUpdate(
        { _id: id },
        {
          $inc: { unit: -unit },
        },
        {
          new: true,
        }
      );
      console.log({ unit });
    }

    const response = await fetch("http://127.0.0.1:3001/api/orders/state", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: invoice.order_id,
        state: "SHIPPED",
      }),
    });

    res.status(200).json(await response.json());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.buy = buy;
exports.ship = ship;
