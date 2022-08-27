const fetch = require("node-fetch");
const express = require("express");
const router = express.Router();

const getAllProducts = async (req, res) => {
  try {
    const response = await fetch("http://127.0.0.1:5001/products");
    const products = await response.json();

    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

router.get("/", getAllProducts);

module.exports = router;
