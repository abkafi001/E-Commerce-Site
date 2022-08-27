const bcrypt = require("bcrypt");
const _ = require("lodash");
const User = require("../models/user");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

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
    });

    await user.save();

    const token = user.generateToken();

    console.info(`User created ${user}`);

    return res
      .header("x-auth-token", token)
      .status(201)
      .json(_.pick(user, ["_id", "name", "email"]));
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

    console.log("token: " + token);

    return res
      .header("x-auth-token", token)
      .status(201)
      .json(_.pick(user, ["_id", "name", "email"]));
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

exports.loginUser = loginUser;
exports.registerUser = registerUser;
exports.addBankInfo = addBankInfo;
exports.updateCart = updateCart;
