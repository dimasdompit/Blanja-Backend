const express = require('express')
const router = express.Router()
const { getAllProductImages, getProductImagesDetails, getProductImagesByProductId, insertProductImages, updateProductImages, deleteProductImages } = require('../controllers/ProductImagesController')
const tokenCheck = require('../middlewares/TokenCheck')
const { checkRole } = require('../middlewares/RoleCheck')
const ImageFilter = require('../middlewares/ImageFilterProducts')

router.get('/', getAllProductImages)
router.get('/:id', getProductImagesDetails)
router.get('/product/:id', getProductImagesByProductId)
router.post('/', tokenCheck, checkRole, ImageFilter, insertProductImages)
router.put('/:id', tokenCheck, checkRole, ImageFilter, updateProductImages)
router.delete('/:id', tokenCheck, checkRole, deleteProductImages)

module.exports = router
