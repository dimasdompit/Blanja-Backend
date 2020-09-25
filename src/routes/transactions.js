const express = require('express')
const router = express.Router()
const tokenCheck = require('../middlewares/TokenCheck')
const {
  insertTransactions,
  getAllTransactions,
  getMyTransactions,
  getTransactionDetails
} = require('../controllers/TransactionsController')

router.post('/', tokenCheck, insertTransactions)
router.get('/', tokenCheck, getAllTransactions)
router.get('/my-transactions', tokenCheck, getMyTransactions)
router.get('/detail/:id', tokenCheck, getTransactionDetails)

module.exports = router
