const fetch = require("node-fetch");
const User = require("../models/user");
const Order = require("../models/order");

const create = async (req, res) => {
  try {
    const { txId, products } = req.body;

    const _id = req.user._id;

    const user = await User.findOne({ _id: _id }).exec();

    if (!user) {
      res.status(404).json(`user with id: ${_id} not found`);
    }

    const order = new Order({
      buyer: user,
      txId: txId,
      products: products,
      state: "PENDING",
    });

    order.save();

    const response = await fetch("http://127.0.0.1:5001/buy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: order._id,
        buyer: {
          name: user.name,
          email: user.email,
        },
        txId: txId,
        products: products,
      }),
    });

    const actual_response = await response.json();

    return res.status(200).json(await response.json());
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.message,
    });
  }
};

const updateState = async (req, res) => {
  try {
    const { order_id, state } = req.body;

    await Order.findOneAndUpdate(
      { _id: order_id },
      { state: state },
      { new: true }
    ).exec();

    return res.status(200).json({ order_id: order_id, state: state });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

const findByUserId = async (req, res) => {
  try {
    const _id = req.user._id;

    const user = await User.findById({ _id }).exec();

    const orders = await Order.find({ buyer: user }).exec();

    return res.status(200).json({ orders: orders });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

exports.create = create;
exports.updateState = updateState;
exports.findByUserId = findByUserId;
