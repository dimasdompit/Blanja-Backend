const { response } = require('../helpers/response')
const {
  AddColorsValidation,
  UpdateColorsValidation
} = require('../helpers/validation')
const {
  getAllColorsModel,
  getColorDetailsModel,
  addColorsModel,
  updateColorsModel,
  deleteColorsModel
} = require('../models/colors')

module.exports = {
  getAllColors: async (req, res) => {
    try {
      const result = await getAllColorsModel()
      if (result[0]) {
        return response(res, true, 'Get All Colors Success', result, 200)
      }
      return response(res, false, 'Colors Not Found', [], 404)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  },

  getColorDetails: async (req, res) => {
    const id = req.params.id
    try {
      const result = await getColorDetailsModel(id)
      if (result[0]) {
        return response(res, true, 'Get Color Details Success', result, 200)
      }
      return response(res, false, `Colors with ID=${id} Not Found`, [], 404)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  },

  addColors: async (req, res) => {
    const data = req.body
    try {
      const validation = AddColorsValidation(data)
      if (validation.error === undefined) {
        const result = await addColorsModel(data)
        return response(res, true, 'Add Color Success', result, 201)
      }
      let errorMsg = validation.error.details[0].message
      errorMsg = errorMsg.replace(/"/g, '')
      return response(res, false, errorMsg, [], 400)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  },

  updateColors: async (req, res) => {
    const data = req.body
    const id = req.params.id
    try {
      const validation = UpdateColorsValidation(data)
      if (validation.error === undefined) {
        const result = await updateColorsModel(data, id)
        return response(res, true, 'Color Updated Successfully', result, 201)
      }
      let errorMsg = validation.error.details[0].message
      errorMsg = errorMsg.replace(/"/g, '')
      return response(res, false, errorMsg, [], 400)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  },

  deleteColors: async (req, res) => {
    const id = req.params.id
    try {
      const result = await deleteColorsModel(id)
      if (result.affectedRows === 1) {
        const newResult = {
          id: result.id
        }
        return response(res, true, 'Color Has Been Successfully Removed', newResult, 200)
      }
      return response(res, false, `Color with ID = ${id} Not Found`, [], 404)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  }
}
