const router = require("express").Router();
const controller = require("../controllers/supplierController");
const auth = require("../middleware/auth");

router.post("/", auth, controller.createSupplier);
router.get("/", auth, controller.getSuppliers);
router.put("/:id", auth, controller.updateSupplier);
router.delete("/:id", auth, controller.deleteSupplier);

module.exports = router;
