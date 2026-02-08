const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  salesOrderId: { type: mongoose.Schema.Types.ObjectId, ref: "SalesOrder" },
  customerName: String,
  amount: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Invoice", invoiceSchema);
