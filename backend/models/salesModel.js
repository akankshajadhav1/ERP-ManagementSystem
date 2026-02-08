const mongoose = require("mongoose");

const salesOrderSchema = new mongoose.Schema({
  customerName: String,
  productName: String,
  price: Number,
  status: { type: String, default: "Pending" },
  date: { type: Date, default: Date.now }
});


module.exports = mongoose.model("SalesOrder", salesOrderSchema);
