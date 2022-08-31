const fetch = require("node-fetch");
const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const response = await fetch(`http://127.0.0.1:5001/products/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const product = await response.json();

    console.log(product);
    return res.status(200).json(product);
  } catch (err) {
    console.log(err);
    return;
    return res.status(500).json({ err: err.message });
  }
};

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
router.get("/:id", [auth, getProduct]);

module.exports = router;
