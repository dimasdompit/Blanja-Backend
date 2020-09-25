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

module.exports = {
  getAllCategories: async (req, res) => {
    try {
      const result = await getAllCategoriesModel()

      if (result[0]) {
        return response(res, true, result, 200)
      }
      return response(res, false, 'Sorry.. Categories Not Found', 404)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', 500)
    }
  },

  getCategoriesDetails: async (req, res) => {
    const id = req.params.id
    try {
      const result = await getCategoriesDetailsModel(id)

      if (result[0]) {
        return response(res, true, result, 200)
      }
      return response(res, false, `Categories with ID = ${id} Not Found`, 404)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', 500)
    }
  },

  addCategories: async (req, res) => {
    const data = req.body
    try {
      const validation = AddCategoriesValidation(data)

      if (validation.error === undefined) {
        const result = await addCategoriesModel(data)
        return response(res, true, result, 201)
      }

      let errorMsg = validation.error.details[0].message
      errorMsg = errorMsg.replace(/"/g, '')
      return response(res, false, errorMsg, 400)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', 500)
    }
  },

  updateCategories: async (req, res) => {
    const data = req.body
    const id = req.params.id
    try {
      const validation = UpdateCategoriesValidation(data)

      if (validation.error === undefined) {
        const result = await updateCategoriesModel(data, id)
        return response(res, true, result, 200)
      }

      let errorMsg = validation.error.details[0].message
      errorMsg = errorMsg.replace(/"/g, '')
      return response(res, false, errorMsg, 400)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', 500)
    }
  },

  deleteCategories: async (req, res) => {
    const id = req.params.id
    try {
      const result = await deleteCategoriesModel(id)

      if (result.affectedRows === 1) {
        return response(res, true, result, 200)
      }
      return response(res, false, `Categories with ID = ${id} Not Found`, 404)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', 500)
    }
  }
}
