const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

// routes
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/sales", require("./routes/salesRoutes"));
app.use("/api/purchase-orders", require("./routes/purchaseRoutes"));
app.use("/api/invoices", require("./routes/invoiceRoutes"));
app.use("/api/grn", require("./routes/grnRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/customers", require("./routes/customerRoutes"));
app.use("/api/suppliers", require("./routes/supplierRoutes"));

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
