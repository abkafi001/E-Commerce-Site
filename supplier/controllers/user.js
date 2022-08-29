const bcrypt = require("bcrypt");
const _ = require("lodash");
const User = require("../models/user");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

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
    const { bank_cred } = req.body.bank_cred;
    const _id = req.user._id;
    const userExists = await User.findOne({ _id }).exec();

    if (!userExists) {
      throw new Error(`No user with the id: ${_id} exists`);
    }
    await User.findOneAndUpdate(
      { _id: _id },
      {
        bank_cred: bank_cred,
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

exports.loginUser = loginUser;
exports.registerUser = registerUser;
exports.addBankInfo = addBankInfo;
