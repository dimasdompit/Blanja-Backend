const express = require('express')
const router = express.Router()
const {
  getAllProducts,
  getProductDetails,
  getProductsByUserId,
  getProductsByCategories,
  addProducts,
  updateProducts,
  deleteProducts
} = require('../controllers/ProductsController')
const tokenCheck = require('../middlewares/TokenCheck')
const { checkRole } = require('../middlewares/RoleCheck')
const ImageFilter = require('../middlewares/ImageFilterProducts')

router.get('/', getAllProducts)
router.get('/:id', getProductDetails)
router.get('/seller/:id', tokenCheck, checkRole, getProductsByUserId)
router.get('/category/:id', getProductsByCategories)
router.post('/', tokenCheck, checkRole, ImageFilter, addProducts)
router.put('/:id', tokenCheck, checkRole, ImageFilter, updateProducts)
router.delete('/:id', tokenCheck, checkRole, deleteProducts)

module.exports = router
