const router = require("express").Router();
const controller = require("../controllers/invoiceController");
const auth = require("../middleware/auth");

router.post("/", auth, controller.createInvoice);
router.get("/", auth, controller.getInvoices);

module.exports = router;
