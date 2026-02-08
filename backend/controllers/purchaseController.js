const PurchaseOrder = require("../models/purchaseModel");

exports.createPO = async (req, res) => {
  const po = await PurchaseOrder.create(req.body);
  res.json(po);
};

exports.getPO = async (req, res) => {
  const po = await PurchaseOrder.find();
  res.json(po);
};
exports.updatePOStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const po = await PurchaseOrder.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  res.json(po);
}
  ;
exports.deletePO = async (req, res) => {
  await PurchaseOrder.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
}
  ;
