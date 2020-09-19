const express = require("express");
const router = express.Router();
const {
  Register,
  Login,
  ForgotPassword,
  Verification,
  ChangePassword,
} = require("../controllers/AuthController");

router.post("/register", Register);
router.post("/login", Login);
router.post("/verify", Verification);
router.post("/forgot-password", ForgotPassword);
router.post("/change-password", ChangePassword);

module.exports = router;
