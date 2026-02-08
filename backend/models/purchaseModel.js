const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  supplierName: String,
  productName: String,
  quantity: Number,
  price: Number,
  status: { type: String, default: "Ordered" },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("PurchaseOrder", purchaseSchema);
