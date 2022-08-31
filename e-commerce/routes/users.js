const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  loginUser,
  registerUser,
  addBankInfo,
  getCart,
  updateCart,
  addProduct,
  removeProduct,
} = require("../controllers/user");

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/bankinfo", auth, addBankInfo);
router.get("/cart", auth, getCart);
router.post("/cart", auth, updateCart);
router.post("/add-product", auth, addProduct);
router.post("/remove-product", auth, removeProduct);

module.exports = router;
