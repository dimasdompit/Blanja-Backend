const { response } = require('../helpers/response')
const { hashSync, genSalt } = require('bcrypt')
const {
  EditUserValidation,
  AddAddressValidation,
  EditAddressValidation
} = require('../helpers/validation')
const {
  getUserByIdModel,
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
  getUserById: async (req, res) => {
    const id = req.decoded.result[0].id

    try {
      const result = await getUserByIdModel(id)

      if (result[0]) {
        delete result[0].password
        return response(res, true, 'Get User By ID Success', result[0], 200)
      }
      return response(res, true, 'User Not Found', [], 404)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  },

  editProfile: async (req, res) => {
    try {
      const id = req.decoded.result[0].id
      const data = req.body
      req.body.password ? (req.body.password = hashSync(req.body.password, genSalt(1))) : null
      const getUser = await getUserModel(id)
      const oldImage = getUser[0].image

      if (!req.fileValidationError) {
        const image = req.file ? req.file.filename : null
        image !== null ? (data.image = image) : null
        const validation = await EditUserValidation(data)

        if (validation.error === undefined) {
          const result = await editUserModel(data, id)
          if (result.affectedRows === 1 && oldImage !== 'user-default.png') { fs.unlinkSync(`./src/images/users/${oldImage}`) }
          const newData = await getUserModel(id)
          delete newData[0].password
          const newResult = newData[0]
          return response(res, true, 'Edit Profile Success', newResult, 200)
        }
        let errorMessage = validation.error.details[0].message
        errorMessage = errorMessage.replace(/"/g, '')
        fs.unlinkSync(`./src/images/users/${data.image}`)
        return response(res, false, errorMessage, [], 400)
      }
      return response(res, false, req.fileValidationError, [], 400)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
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
          return response(res, true, 'Add Address Success', result, 201)
        }
      }
      let errorMessage = validation.error.details[0].message
      errorMessage = errorMessage.replace(/"/g, '')
      return response(res, false, errorMessage, [], 400)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
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
            return response(res, true, 'Edit Address Success', result, 200)
          }
        }
        return response(res, false, 'Data Not Found', [], 404)
      }
      let errorMessage = validation.error.details[0].message
      errorMessage = errorMessage.replace(/"/g, '')
      return response(res, false, errorMessage, [], 400)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  },

  getMyAddress: async (req, res) => {
    try {
      const id = req.decoded.result[0].id
      if (id) {
        const result = await getMyAddressModel(id)
        return response(res, true, 'Get Address Success', result, 200)
      }
      return response(res, false, 'ID is Null', [], 400)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  },

  getDetailMyAddress: async (req, res) => {
    try {
      const id = req.params.id
      if (id) {
        const result = await getDetailMyAddressModel(id)
        if (result.length === 1) {
          return response(res, true, 'Get Details My Address Success', result[0], 200)
        }
        return response(res, false, 'Address Not Found', [], 404)
      }
      return response(res, false, 'ID is Null', [], 400)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
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
            const newResult = {
              id: deleted.id
            }
            return response(
              res,
              true,
              `Address with ID ${id} successfully deleted`,
              newResult,
              200
            )
          }
          return response(res, false, 'Address failed to delete', [], 400)
        }
        return response(res, false, 'Address Not Found', [], 404)
      }
      return response(res, false, 'ID is Null', [], 400)
    } catch (error) {
      console.log(error)
      return response(res, false, 'Internal Server Error', [], 500)
    }
  }
}
