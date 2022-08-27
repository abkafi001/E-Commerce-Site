require("dotenv").config();
const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).json({ error: "Access Denied. No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    console.log("decoded: " + JSON.stringify(decoded));
    next();
  } catch (err) {
    return res.status(400).json({ error: "Invalid token" });
  }
};
