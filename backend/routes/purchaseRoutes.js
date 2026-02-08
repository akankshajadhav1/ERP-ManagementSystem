const router = require("express").Router();
const controller = require("../controllers/purchaseController");
const auth = require("../middleware/auth");

router.post("/", auth, controller.createPO);
router.get("/", auth, controller.getPO);
router.put("/:id/status", auth, controller.updatePOStatus);
router.delete("/:id", auth, controller.deletePO);
module.exports = router;

