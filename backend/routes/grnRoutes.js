const router = require("express").Router();
const controller = require("../controllers/grnController");
const auth = require("../middleware/auth");

router.post("/", auth, controller.createGRN);
router.get("/", auth, controller.getGRNs);
router.put("/:id/status", auth, controller.updateGRNStatus);
router.delete("/:id", auth, controller.deleteGRN);
module.exports = router;

