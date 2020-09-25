const { response } = require('../helpers/response')
const { hashSync, genSalt } = require('bcrypt')
const {
  EditUserValidation,
  AddAddressValidation,
  EditAddressValidation
} = require('../helpers/validation')
const {
  editUserModel,
  getUserModel,
  addAddressModel,
  editAddressModel,
  getMyAddressModel,
  getDetailMyAddressModel,
  deleteMyAddressModel
} = require('../models/profile')
const fs = require('fs')

module.exports = {
  editProfile: async (req, res) => {
    try {
      const id = req.decoded.result[0].id
      req.body.password
        ? (req.body.password = hashSync(req.body.password, genSalt(1)))
        : null
      const data = req.body
      const getUser = await getUserModel(id)
      const oldImage = getUser[0].image

      if (!req.fileValidationError) {
        const image = req.file ? req.file.filename : null
        image !== null ? (data.image = image) : null
        const validation = await EditUserValidation(data)

        if (validation.error === undefined) {
          const result = await editUserModel(data, id)
          if (result.affectedRows === 1 && oldImage !== 'user-default.png') { fs.unlinkSync(`./src/images/users/${oldImage}`) }
          return response(res, true, result, 200)
        }
        let errorMessage = validation.error.details[0].message
        errorMessage = errorMessage.replace(/"/g, '')
        fs.unlinkSync(`./src/images/users/${data.image}`)
        return response(res, false, errorMessage, 400)
      }
      return response(res, false, req.fileValidationError, 400)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', 500)
    }
  },

  addMyAddress: async (req, res) => {
    try {
      const id = req.decoded.result[0].id
      const data = req.body
      data.user_id = id
      const validation = await AddAddressValidation(data)

      if (validation.error === undefined) {
        const result = await addAddressModel(data)
        if (result) {
          return response(res, true, result, 201)
        }
      }
      let errorMessage = validation.error.details[0].message
      errorMessage = errorMessage.replace(/"/g, '')
      return response(res, false, errorMessage, 400)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', 500)
    }
  },

  editMyAddress: async (req, res) => {
    try {
      const id = req.params.id
      const data = req.body
      const validation = await EditAddressValidation(data)

      if (validation.error === undefined) {
        const checkData = await getDetailMyAddressModel(id)
        if (checkData.length === 1) {
          const result = await editAddressModel(data, id)
          if (result) {
            return response(res, true, result, 200)
          }
        }
        return response(res, false, 'Data Not Found', 404)
      }
      let errorMessage = validation.error.details[0].message
      errorMessage = errorMessage.replace(/"/g, '')
      return response(res, false, errorMessage, 400)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', 500)
    }
  },

  getMyAddress: async (req, res) => {
    try {
      const id = req.decoded.result[0].id
      if (id) {
        const result = await getMyAddressModel(id)
        return response(res, true, result, 200)
      }
      return response(res, false, 'ID is Null', 400)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', 500)
    }
  },

  getDetailMyAddress: async (req, res) => {
    try {
      const id = req.params.id
      if (id) {
        const result = await getDetailMyAddressModel(id)
        if (result.length === 1) {
          return response(res, true, result, 200)
        }
        return response(res, false, 'Address Not Found', 404)
      }
      return response(res, false, 'ID is Null', 400)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', 500)
    }
  },

  deleteMyAddress: async (req, res) => {
    try {
      const id = req.params.id
      if (id) {
        const result = await getDetailMyAddressModel(id)
        if (result.length === 1) {
          const deleted = await deleteMyAddressModel(id)
          if (deleted.affectedRows === 1) {
            return response(
              res,
              true,
              `Address with ID ${id} successfully deleted`,
              200
            )
          }
          return response(res, false, 'Address failed to delete', 400)
        }
        return response(res, false, 'Address Not Found', 404)
      }
      return response(res, false, 'ID is Null', 400)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', 500)
    }
  }
}
