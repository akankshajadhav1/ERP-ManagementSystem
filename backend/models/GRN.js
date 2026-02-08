const mongoose = require("mongoose");

const grnSchema = new mongoose.Schema({
  purchaseOrderId: { type: mongoose.Schema.Types.ObjectId, ref: "PurchaseOrder" },
  supplierName: String,
  productName: String,
  quantity: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("GRN", grnSchema);
