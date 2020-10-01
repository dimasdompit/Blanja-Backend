const express = require('express')
const router = express.Router()
const tokenCheck = require('../middlewares/TokenCheck')
const { checkRole } = require('../middlewares/RoleCheck')
const ImageFilter = require('../middlewares/ImageFilterCategories')
const {
  getAllCategories,
  getCategoriesDetails,
  addCategories,
  updateCategories,
  deleteCategories
} = require('../controllers/CategoriesController')

router.get('/', getAllCategories)
router.get('/:id', getCategoriesDetails)
router.post('/', tokenCheck, checkRole, ImageFilter, addCategories)
router.put('/:id', tokenCheck, checkRole, ImageFilter, updateCategories)
router.delete('/:id', tokenCheck, checkRole, deleteCategories)

module.exports = router
