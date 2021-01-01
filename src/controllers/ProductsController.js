const { response } = require('../helpers/response')
const {
  AddProductsValidation,
  UpdateProductsValidation
} = require('../helpers/validation')
const {
  totalProductsModel,
  getAllProductsModel,
  getEveryProductsModel,
  getProductDetailsModel,
  getProductsByUserId,
  getProductsByCategories,
  addProductsModel,
  updateProductsModel,
  deleteProductsModel
} = require('../models/products')
const {
  // getAllProductImagesModel,
  getProductImagesByProductIdModel,
  insertProductImagesModel,
  updateProductImagesModel,
  deleteProductImagesModel
} = require('../models/product_images')
const { getCategoriesDetailsModel } = require('../models/categories')
const { getColorDetailsModel } = require('../models/colors')
const { getConditionDetailsModel } = require('../models/conditions')
const { getSizeDetailsModel } = require('../models/sizes')
const fs = require('fs')

module.exports = {
  getAllProducts: async (req, res) => {

    const search = req.query.search || ''
    const sort = req.query.sort || 'created_at'
    const order = req.query.order || 'DESC'
    const limit = parseInt(req.query.limit) || 10
    const page = parseInt(req.query.page) || 1

    try {
      const totalProducts = await totalProductsModel(search)
      console.log(totalProducts)
      const spreadData = {
        ...totalProducts
      }
      const totalData = spreadData['COUNT(*)']

      const results = await getAllProductsModel(
        search,
        sort,
        order,
        limit,
        page
      )

      // const totalData = results.length

      const totalPage = Math.ceil(totalData / limit)
      const nextPage = (page + 1) <= totalPage ? (page + 1) : null
      const previousPage = (page - 1) > 0 ? (page - 1) : null

      const pagination = {
        page: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
        nextPage: nextPage,
        previousPage: previousPage
      }

      if (results[0]) {
        return response(res, true, 'Get All Products Success', results, 200, pagination)
      }
      return response(res, false, 'Sorry.. Products Not Found', [], 404)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  },

  getProductDetails: async (req, res) => {
    const id = parseInt(req.params.id)

    const getItem = async (productId) => {
      const responseData = await getEveryProductsModel()
      const product = responseData.find(item => item.id === productId)
      return product
    }

    try {
      const result = await getProductDetailsModel(id)

      if (result[0]) {
        const productImages = await getProductImagesByProductIdModel(result[0].id)
        const image = productImages.map((file) => {
          const filename = file.image
          return filename
        })

        const product = await getItem(id)
        const category = await getCategoriesDetailsModel(product.category_id)
        const color = await getColorDetailsModel(product.color_id)
        const conditionName = await getConditionDetailsModel(product.condition_id)
        const size = await getSizeDetailsModel(product.size_id)

        const newResult = {
          ...result[0],
          images: image,
          category: category[0],
          color: color[0],
          condition_name: conditionName[0],
          size: size[0]
        }
        return response(res, true, 'Get Product Success', newResult, 200)
      }
      return response(res, false, `Product with ID = ${id} Not Found`, [], 404)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  },

  getProductsByUserId: async (req, res) => {
    const id = parseInt(req.params.id)
    const userId = req.decoded.result[0].id

    try {
      if (id === userId) {
        const result = await getProductsByUserId(id)

        if (result[0]) {
          return response(res, true, 'Get Product By User ID Success', result, 200)
        }
        return response(res, false, `Product with ID = ${id} Not Found`, [], 404)
      }
      return response(res, false, 'Product Not Found', [], 404)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  },

  getProductsByCategories: async (req, res) => {
    const id = req.params.id

    try {
      const result = await getProductsByCategories(id)

      if (result[0]) {
        return response(res, true, 'Get Products By Category Success', result, 200)
      }
      return response(res, false, `Product with Category ID = ${id} Not Found`, [], 404)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  },

  addProducts: async (req, res) => {
    const data = req.body
    const userId = req.decoded.result[0].id
    data.store = userId

    try {
      const result = await addProductsModel(data)
      const productId = result.id

      if (req.files) {
        req.files.map(async (file) => {
          const dataImage = {
            product_id: productId,
            image: file.filename
          }
          await insertProductImagesModel(dataImage)
        })
      }
      if (req.fileValidationError) {
        return response(res, false, req.fileValidationError, [], 400)
      }

      const validation = AddProductsValidation(data)
      if (validation.error === undefined) {
        const getImage = await getProductImagesByProductIdModel(result.id)
        const images = getImage.map((file) => {
          const filename = file.image
          return filename
        })

        const updateImageId = {
          image: getImage[0].image
        }

        await updateProductsModel(updateImageId, productId)
        const newData = await getProductDetailsModel(productId)
        const newResult = {
          ...newData[0],
          images: images
        }
        return response(res, true, 'Add Product Success', newResult, 201)
      }
      let errorMsg = validation.error.details[0].message
      errorMsg = errorMsg.replace(/"/g, '')
      return response(res, false, errorMsg, [], 401)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  },

  updateProducts: async (req, res) => {
    try {
      const data = req.body
      const id = req.params.id
      let existImage = null
      const oldImagesData = await getProductImagesByProductIdModel(id)
      if (req.files) {
        req.files.map(async (file, i) => {
          const imageId = oldImagesData[i].id
          existImage = oldImagesData[i].image
          const image = file.filename
          const newImageData = {
            image: image
          }
          fs.unlinkSync(`./src/images/products/${existImage}`)
          await updateProductImagesModel(newImageData, imageId)
        })
      }
      if (req.fileValidationError) {
        return response(res, false, req.fileValidationError, [], 400)
      }

      const validation = UpdateProductsValidation(data)
      if (validation.error === undefined) {
        const result = await updateProductsModel(data, id)
        if (result.id === id) {
          const newImagesData = await getProductImagesByProductIdModel(id)
          const imageProduct = {
            image: newImagesData[0].image
          }
          await updateProductsModel(imageProduct, id)

          const images = newImagesData.map((file) => {
            const filename = file.image
            return filename
          })
          const newData = await getProductDetailsModel(id)
          const newResult = {
            ...newData[0],
            images: images
          }
          return response(res, true, 'Product Updated Successfully', newResult, 200)
        }
        return response(res, false, `Product with ID = ${id} not found!`, [], 404)
      }
      let errorMsg = validation.error.details[0].message
      errorMsg = errorMsg.replace(/"/g, '')
      return response(res, false, errorMsg, [], 401)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  },

  deleteProducts: async (req, res) => {
    const id = req.params.id
    try {
      const data = await getProductImagesByProductIdModel(id)
      data.map((img, i) => {
        const image = img.image
        fs.unlinkSync(`./src/images/products/${image}`)
      })
      const result = await deleteProductsModel(id)
      await deleteProductImagesModel(id)
      if (result.affectedRows === 1) {
        const newResult = {
          id: result.id
        }
        return response(res, true, 'Product Has Been Successfully Removed', newResult, 200)
      }
      return response(res, false, `Data with ID = ${id} not found!`, [], 404)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  }
}
