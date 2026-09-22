const authenticateUser = require("../middlewares/authenticateUser.middleware");
const express = require("express");
const validateRegister = require("../middlewares/validateRegister.middleware")
const validateLogin = require("../middlewares/validateLogin.middleware");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", validateRegister.validateRegister, authController.registerUser);
router.post("/login",validateLogin.validateLogin,authController.loginUser);
router.get("/me", authenticateUser.authenticateUser, authController.getCurrentUser);

module.exports = router;