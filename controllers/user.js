const bcrypt = require("bcrypt");
const User = require("../models/user");

const registerUser = async (req, res, next) => {
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

    const result = await user.save();

    console.info(`User created ${user}`);

    return res.status(201).json({ user: user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.toString(),
    });
  }
};

const loginUser = async (req, res, next) => {
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

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.toString(),
    });
  }
};

exports.loginUser = loginUser;
exports.registerUser = registerUser;
