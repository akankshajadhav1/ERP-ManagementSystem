const router = require("express").Router();
const controller = require("../controllers/authController");

const auth = require("../middleware/auth");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/users", auth, controller.getUsers);
router.delete("/users/:id", auth, controller.deleteUser);
router.put("/users/:id/role", auth, controller.updateUserRole);



module.exports = router;
