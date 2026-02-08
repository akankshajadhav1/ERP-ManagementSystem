const router = require("express").Router();
const controller = require("../controllers/salesController");
const auth = require("../middleware/auth");

router.post("/", auth, controller.createOrder);
router.get("/", auth, controller.getOrders);
router.put("/:id/status", auth, controller.updateOrderStatus);
router.delete("/:id", auth, controller.deleteOrder);
module.exports = router;
