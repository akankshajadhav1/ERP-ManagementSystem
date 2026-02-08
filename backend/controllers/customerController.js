const Customer = require("../models/customerModel");

// create
exports.createCustomer = async (req, res) => {
  const customer = await Customer.create(req.body);
  res.json(customer);
};

// get all
exports.getCustomers = async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
};

// delete
exports.deleteCustomer = async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ msg: "Customer deleted" });
};
