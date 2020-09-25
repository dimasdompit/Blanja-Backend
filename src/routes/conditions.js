const express = require('express')
const router = express.Router()
const {
  getAllConditions,
  getConditionDetails,
  addConditions,
  updateConditions,
  deleteConditions
} = require('../controllers/ConditionsController')

router.get('/', getAllConditions)
router.get('/:id', getConditionDetails)
router.post('/', addConditions)
router.put('/:id', updateConditions)
router.delete('/:id', deleteConditions)

module.exports = router
