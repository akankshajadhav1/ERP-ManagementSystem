const Invoice = require("../models/invoiceModel");

exports.createInvoice = async (req, res) => {
  const invoice = await Invoice.create(req.body);
  res.json(invoice);
};

exports.getInvoices = async (req, res) => {
  const invoices = await Invoice.find().populate("salesOrderId");
  res.json(invoices);
};
exports.updateInvoiceStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const invoice = await Invoice.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  res.json(invoice);
}
  ;
exports.deleteInvoice = async (req, res) => {
  await Invoice.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
}
  ;
