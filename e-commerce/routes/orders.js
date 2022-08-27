const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const { create, updateState, findByUserId } = require("../controllers/order");

router.get("/", [auth, findByUserId]);

router.post("/state", updateState);

router.post("/buy", [auth, create]);

module.exports = router;
