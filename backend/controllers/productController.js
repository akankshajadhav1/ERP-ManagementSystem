const Product = require("../models/productModel");

// create product
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// get all
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
