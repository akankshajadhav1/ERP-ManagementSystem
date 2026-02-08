const Product = require("../models/productModel");
const Customer = require("../models/customerModel");
const SalesOrder = require("../models/salesModel");

exports.getDashboard = async (req, res) => {
  const stats = {
    products: await Product.countDocuments(),
    customers: await Customer.countDocuments(),
    orders: await SalesOrder.countDocuments()
  };

  res.json(stats);
};

