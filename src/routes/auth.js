const express = require("express");
const router = express.Router();
const {
  Register,
  Login,
  ForgotPassword,
} = require("../controllers/AuthController");

router.post("/register", Register);
router.post("/login", Login);
router.post("/forgot-password", ForgotPassword);

module.exports = router;
