const express = require('express')
const router = express.Router()
const {
  getAllColors,
  getColorDetails,
  addColors,
  updateColors,
  deleteColors
} = require('../controllers/ColorsController')

router.get('/', getAllColors)
router.get('/:id', getColorDetails)
router.post('/', addColors)
router.put('/:id', updateColors)
router.delete('/:id', deleteColors)

module.exports = router
