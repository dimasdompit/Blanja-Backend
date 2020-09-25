const { response } = require('../helpers/response')
const {
  AddConditionsValidation,
  UpdateConditionsValidation
} = require('../helpers/validation')
const {
  getAllConditionsModel,
  getConditionDetailsModel,
  addConditionsModel,
  updateConditionsModel,
  deleteConditionsModel
} = require('../models/conditions')

module.exports = {
  getAllConditions: async (req, res) => {
    try {
      const result = await getAllConditionsModel()
      if (result[0]) {
        return response(res, true, 'Get All Conditions Success', result, 200)
      }
      return response(res, false, 'Conditions Not Found', [], 404)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  },

  getConditionDetails: async (req, res) => {
    const id = req.params.id
    try {
      const result = await getConditionDetailsModel(id)
      if (result[0]) {
        return response(res, true, 'Get Condition Details Success', result, 200)
      }
      return response(res, false, `Conditions with ID=${id} Not Found`, [], 404)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  },

  addConditions: async (req, res) => {
    const data = req.body
    try {
      const validation = AddConditionsValidation(data)
      if (validation.error === undefined) {
        const result = await addConditionsModel(data)
        return response(res, true, 'Add Conditions Success', result, 201)
      }
      let errorMsg = validation.error.details[0].message
      errorMsg = errorMsg.replace(/"/g, '')
      return response(res, false, errorMsg, [], 400)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  },

  updateConditions: async (req, res) => {
    const data = req.body
    const id = req.params.id
    try {
      const validation = UpdateConditionsValidation(data)
      if (validation.error === undefined) {
        const result = await updateConditionsModel(data, id)
        return response(res, true, 'Condition Updated Successfully', result, 201)
      }
      let errorMsg = validation.error.details[0].message
      errorMsg = errorMsg.replace(/"/g, '')
      return response(res, false, errorMsg, [], 400)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  },

  deleteConditions: async (req, res) => {
    const id = req.params.id
    try {
      const result = await deleteConditionsModel(id)
      if (result.affectedRows === 1) {
        return response(res, true, 'Color Has Been Successfully Removed', result, 200)
      }
      return response(res, false, `Condition with ID = ${id} Not Found`, [], 404)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  }
}
