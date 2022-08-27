const bcrypt = require("bcrypt");
const _ = require("lodash");
const User = require("../models/user");
const Transaction = require("../models/transaction");

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email: email }).exec();

    if (user) {
      return res.status(409).json({
        message: "User with this email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      email: email,
      password: hashedPassword,
    });

    await user.save();

    const token = user.generateToken();

    console.info(`User created ${user}`);

    return res
      .header("x-auth-token", token)
      .status(201)
      .json(_.pick(user, ["_id", "email", "balance"]));
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.toString(),
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { id, password } = req.body;

    let user = await User.findOne({ _id: id }).exec();

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
      .json(_.pick(user, ["_id", "email", "balance"]));
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.toString(),
    });
  }
};

const getBalance = async (req, res) => {
  try {
    const _id = req.user._id;

    const user = await User.findOne({ _id }).exec();

    return res.status(200).json({ ammount: user.balance });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
};

const transferTo = async (req, res) => {
  try {
    const { id, ammount } = req.body;

    const _id = req.user._id;

    const sender = await User.findOne({ _id: _id }).exec();

    if (!sender) {
      throw new Error(`No user with the id: ${_id} exists`);
    }

    const receiver = await User.findOne({ _id: id }).exec();

    if (!receiver) {
      throw new Error(`No user with the id: ${_id} exists`);
    }

    await User.findOneAndUpdate(
      { _id: _id },
      {
        $inc: { balance: -ammount },
      },
      {
        new: true,
      }
    ).exec();

    await User.findOneAndUpdate(
      { _id: id },
      {
        $inc: { balance: ammount },
      },
      {
        new: true,
      }
    ).exec();

    const transaction = new Transaction({
      from: sender,
      to: receiver,
      ammount: ammount,
    });

    transaction.save();

    return res
      .status(200)
      .json({
        txId: transaction._id,
        from: sender._id,
        to: receiver._id,
        ammount: ammount,
      });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
};

exports.loginUser = loginUser;
exports.registerUser = registerUser;
exports.getBalance = getBalance;
exports.transferTo = transferTo;
