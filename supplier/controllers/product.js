const fs = require("fs");
const Product = require("../models/product");

const create = async (req, res) => {
  try {
    const { name, description, category, price, unit } = req.body;
    const supplier = req.user._id;

    console.log(supplier);
    console.log(req.user._id);
    console.log("body: " + JSON.stringify(req.body));
    console.log(`path: ${req.file.path}`);

    const image = fs.readFileSync(req.file.path);
    var encoded_image = image.toString("base64");
    var final_image = {
      data: Buffer.from(encoded_image, "base64"),
      contentType: req.file.mimetype,
    };

    const product = new Product({
      name: name,
      supplier: supplier,
      description: description,
      category: category,
      price: price,
      image: final_image,
      unit: unit,
    });

    product.save(product);

    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Couldn't delete");
      }
    });

    return res.status(200).json({ product: product });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.message,
    });
  }
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const product = await Product.findById(id).exec();
    return res.status(200).json({ product: product });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

const findAll = async (req, res) => {
  try {
    const products = await Product.find({}).exec();
    return res.status(200).json({ products: products });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

exports.create = create;
exports.findById = findById;
exports.findAll = findAll;
