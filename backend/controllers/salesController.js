const SalesOrder = require("../models/salesModel");

exports.createOrder = async (req, res) => {
  const order = await SalesOrder.create(req.body);
  res.json(order);
};

exports.getOrders = async (req, res) => {
  const orders = await SalesOrder.find();

  res.json(orders);
};
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = await SalesOrder.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  res.json(order);
}
  ;
exports.deleteOrder = async (req, res) => {
  await SalesOrder.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
}
  ;

