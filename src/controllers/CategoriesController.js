const { response } = require('../helpers/response')
const {
  AddCategoriesValidation,
  UpdateCategoriesValidation
} = require('../helpers/validation')
const {
  getAllCategoriesModel,
  getCategoriesDetailsModel,
  addCategoriesModel,
  updateCategoriesModel,
  deleteCategoriesModel
} = require('../models/categories')
const fs = require('fs')

module.exports = {
  getAllCategories: async (req, res) => {
    try {
      const result = await getAllCategoriesModel()

      if (result[0]) {
        return response(res, true, 'Get All Categories Success', result, 200)
      }
      return response(res, false, 'Sorry.. Categories Not Found', [], 404)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  },

  getCategoriesDetails: async (req, res) => {
    const id = req.params.id
    try {
      const result = await getCategoriesDetailsModel(id)

      if (result[0]) {
        return response(res, true, 'Get Category Details Success', result[0], 200)
      }
      return response(res, false, `Categories with ID = ${id} Not Found`, [], 404)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  },

  addCategories: async (req, res) => {
    const data = req.body

    if (req.file) {
      data.image = req.file.filename
    }
    if (req.fileValidationError) {
      return response(res, false, req.fileValidationError, [], 400)
    }

    try {
      const validation = AddCategoriesValidation(data)

      if (validation.error === undefined) {
        const result = await addCategoriesModel(data)
        return response(res, true, 'Add Category Success', result, 201)
      }

      let errorMsg = validation.error.details[0].message
      errorMsg = errorMsg.replace(/"/g, '')
      return response(res, false, errorMsg, [], 400)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  },

  updateCategories: async (req, res) => {
    const data = req.body
    const id = req.params.id
    let existImage = null

    if (req.file) {
      const newImage = req.file.filename
      data.image = newImage
      const existData = await getCategoriesDetailsModel(id)
      existImage = existData[0].image
    }
    if (req.fileValidationError) {
      return response(res, false, req.fileValidationError, [], 400)
    }

    try {
      const validation = UpdateCategoriesValidation(data)

      if (validation.error === undefined) {
        const result = await updateCategoriesModel(data, id)
        if (result.id === id) {
          if (existImage !== null) { fs.unlinkSync(`./src/images/categories/${existImage}`) }
          const newData = await getCategoriesDetailsModel(id)
          return response(res, true, 'Product Updated Successfully', newData[0], 200)
        }
        return response(res, false, `Category with ID = ${id} Not Found!`, [], 404)
      }

      let errorMsg = validation.error.details[0].message
      errorMsg = errorMsg.replace(/"/g, '')
      return response(res, false, errorMsg, [], 400)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  },

  deleteCategories: async (req, res) => {
    try {
      const id = req.params.id
      const data = await getCategoriesDetailsModel(id)
      const result = await deleteCategoriesModel(id)

      if (result.affectedRows === 1) {
        const image = data[0].image
        fs.unlinkSync(`./src/images/categories/${image}`)
        const newResult = {
          id: result.id
        }
        return response(res, true, 'Category Has Been Successfully Removed', newResult, 200)
      }
      return response(res, false, `Categories with ID = ${id} Not Found`, [], 404)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  }
}
