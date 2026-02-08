const router = require("express").Router();
const controller = require("../controllers/customerController");
const auth = require("../middleware/auth");

router.post("/", auth, controller.createCustomer);
router.get("/", auth, controller.getCustomers);
router.delete("/:id", auth, controller.deleteCustomer);

module.exports = router;
