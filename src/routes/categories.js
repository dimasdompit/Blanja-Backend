const express = require('express')
const router = express.Router()
const tokenCheck = require('../middlewares/TokenCheck')
const { checkRole } = require('../middlewares/RoleCheck')
const {
  getAllCategories,
  getCategoriesDetails,
  addCategories,
  updateCategories,
  deleteCategories
} = require('../controllers/CategoriesController')

router.get('/', getAllCategories)
router.get('/:id', getCategoriesDetails)
router.post('/', tokenCheck, checkRole, addCategories)
router.put('/:id', tokenCheck, checkRole, updateCategories)
router.delete('/:id', tokenCheck, checkRole, deleteCategories)

module.exports = router
