const fetch = require("node-fetch");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const User = require("../models/user");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, account, secret } = req.body;

    console.log(req.body);

    let user = await User.findOne({ email: email }).exec();

    if (user) {
      return res.status(409).json({
        message: "User with this email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name: name,
      email: email,
      password: hashedPassword,
      bank_cred: {
        account_no: account,
        password: secret,
      },
    });

    await user.save();

    const token = user.generateToken();

    return res.status(201).json({
      ..._.pick(user, ["_id", "name", "email", "account", "secret"]),
      token: token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.toString(),
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email: email }).exec();

    if (!user) {
      return res.status(400).json({
        error: "Invalid email or password",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = user.generateToken();

    if (user.bank_cred) {
      const response = await fetch("http://127.0.0.1:4001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.bank_cred.account_no,
          password: user.bank_cred.password,
        }),
      });

      const { balance } = await response.json();

      console.log({ balance });

      user.balance = balance;
    }

    return res.status(201).json({
      ..._.pick(user, ["_id", "name", "email", "bank_cred", "balance"]),
      token: token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.toString(),
    });
  }
};

const addBankInfo = async (req, res) => {
  try {
    const { account_no, password } = req.body;
    const _id = req.user._id;
    const userExists = await User.findOne({ _id }).exec();

    if (!userExists) {
      throw new Error(`No user with the id: ${_id} exists`);
    }
    await User.findOneAndUpdate(
      { _id: _id },
      {
        bank_cred: {
          account_no: account_no,
          password: password,
        },
      },
      {
        new: true,
      }
    ).exec();

    return res.status(200).json("account added successfully");
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
};

const getCart = async (req, res) => {
  try {
    const _id = req.user._id;
    const user = await User.findOne({ _id }).exec();

    if (!user) {
      res.status(404).json(`user with id: ${_id} not found`);
    }

    return res.status(200).json(user.cart);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const updateCart = async (req, res) => {
  try {
    const { cart } = req.body;
    const _id = req.user._id;
    const user = await User.findOne({ _id }).exec();

    if (!user) {
      res.status(404).json(`user with id: ${_id} not found`);
    }

    User.findOneAndUpdate(
      { _id: _id },
      {
        cart: cart,
      },
      {
        new: true,
      }
    ).exec();

    return res.status(200).json("cart successfully added");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const addProduct = async (req, res) => {
  try {
    let { product_id, price } = req.body;
    price = parseFloat(price);
    const _id = req.user._id;
    let user = await User.findOne({ _id }).exec();

    if (!user) {
      res.status(404).json(`user with id: ${_id} not found`);
    }

    const index = user.cart.findIndex((item) => item.product_id === product_id);

    if (index === -1) {
      user = await User.findOneAndUpdate(
        { _id: _id },
        {
          $push: { cart: { product_id: product_id, price: price, unit: 1 } },
        },
        {
          new: true,
        }
      ).exec();
    } else {
      user = await User.findOneAndUpdate(
        { _id: _id, "cart.product_id": product_id },
        {
          $inc: { "cart.$.unit": 1 },
        },
        {
          new: true,
        }
      ).exec();
    }

    return res.status(200).json({ cart: user.cart });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const removeProduct = async (req, res) => {
  try {
    const { product_id } = req.body;
    const _id = req.user._id;
    let user = await User.findOne({ _id }).exec();

    if (!user) {
      res.status(404).json(`user with id: ${_id} not found`);
    }

    const index = user.cart.findIndex((item) => item.product_id === product_id);

    if (index !== -1) {
      if (user.cart[index].unit === 1) {
        user = await User.findOneAndUpdate(
          { _id: _id },
          {
            $pull: { cart: { product_id: product_id } },
          },
          {
            new: true,
          }
        ).exec();
      } else {
        user = await User.findOneAndUpdate(
          { _id: _id, "cart.product_id": product_id },
          {
            $inc: { "cart.$.unit": -1 },
          },
          {
            new: true,
          }
        ).exec();
      }
    }

    return res.status(200).json({ cart: user.cart });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.loginUser = loginUser;
exports.registerUser = registerUser;
exports.addBankInfo = addBankInfo;
exports.getCart = getCart;
exports.updateCart = updateCart;
exports.addProduct = addProduct;
exports.removeProduct = removeProduct;
