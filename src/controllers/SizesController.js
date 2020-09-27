const { response } = require('../helpers/response')
const {
  AddSizesValidation,
  UpdateSizesValidation
} = require('../helpers/validation')
const {
  getAllSizesModel,
  getSizeDetailsModel,
  addSizesModel,
  updateSizesModel,
  deleteSizesModel
} = require('../models/sizes')

module.exports = {
  getAllSizes: async (req, res) => {
    try {
      const result = await getAllSizesModel()
      if (result[0]) {
        return response(res, true, 'Get All Sizes Success', result, 200)
      }
      return response(res, false, 'Sizes Not Found', [], 404)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  },

  getSizeDetails: async (req, res) => {
    const id = req.params.id
    try {
      const result = await getSizeDetailsModel(id)
      if (result[0]) {
        return response(res, true, 'Get Size Details Success', result[0], 200)
      }
      return response(res, false, `Size with ID=${id} Not Found`, [], 404)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  },

  addSizes: async (req, res) => {
    const data = req.body
    try {
      const validation = AddSizesValidation(data)
      if (validation.error === undefined) {
        const result = await addSizesModel(data)
        return response(res, true, 'Add Size Success', result, 201)
      }
      let errorMsg = validation.error.details[0].message
      errorMsg = errorMsg.replace(/"/g, '')
      return response(res, false, errorMsg, [], 400)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  },

  updateSizes: async (req, res) => {
    const data = req.body
    const id = req.params.id
    try {
      const validation = UpdateSizesValidation(data)
      if (validation.error === undefined) {
        const result = await updateSizesModel(data, id)
        return response(res, true, 'Size Updated Successfully', result, 201)
      }
      let errorMsg = validation.error.details[0].message
      errorMsg = errorMsg.replace(/"/g, '')
      return response(res, false, errorMsg, [], 400)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  },

  deleteSizes: async (req, res) => {
    const id = req.params.id
    try {
      const result = await deleteSizesModel(id)
      if (result.affectedRows === 1) {
        const newResult = {
          id: result.id
        }
        return response(res, true, 'Size Has Been Successfully Removed', newResult, 200)
      }
      return response(res, false, `Size with ID = ${id} Not Found`, [], 404)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  }
}
