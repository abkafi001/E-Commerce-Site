const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const auth = require("../middlewares/auth");

const {
  create,
  findAll,
  findById,
  // updateById,
  deleteById,
} = require("../controllers/product");

router.get("/", findAll);

router.get("/:id", findById);

router.post("/", [auth, upload.single("image"), create]);

// router.put("/:id", updateById);

router.delete("/:id", auth, deleteById);

module.exports = router;
