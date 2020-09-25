const express = require('express')
const router = express.Router()
const {
  Register,
  Login,
  ForgotPassword,
  Verification,
  ChangePassword,
  RefreshToken
} = require('../controllers/AuthController')

router.post('/register', Register)
router.post('/login', Login)
router.post('/verify', Verification)
router.post('/refresh-token', RefreshToken)
router.post('/forgot-password', ForgotPassword)
router.post('/change-password', ChangePassword)

module.exports = router
