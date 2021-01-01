const connection = require('../config/database')
const query = require('../helpers/query/profile')

module.exports = {
  getUserByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      const sql = query.getUserById

      connection.query(sql, id, (error, result) => {
        if (error) reject(error)
        resolve(result)
      })
    })
  },

  editUserModel: (data, id) => {
    return new Promise((resolve, reject) => {
      const sql = query.editUser

      connection.query(sql, [data, id], (error, result) => {
        if (error) reject(error)
        resolve(result)
      })
    })
  },

  getUserModel: (id) => {
    return new Promise((resolve, reject) => {
      const sql = query.getData

      connection.query(sql, id, (error, result) => {
        if (error) reject(error)
        resolve(result)
      })
    })
  },

  addAddressModel: (data) => {
    return new Promise((resolve, reject) => {
      const sql = query.addAddress

      connection.query(sql, data, (error, result) => {
        if (error) reject(error)

        const newData = { id: result.insertId, ...data }
        resolve(newData)
      })
    })
  },

  editAddressModel: (data, id) => {
    return new Promise((resolve, reject) => {
      const sql = query.editAddress

      connection.query(sql, [data, id], (error, result) => {
        if (error) reject(error)

        const newData = { id: id, ...data }
        resolve(newData)
      })
    })
  },

  getMyAddressModel: (userId) => {
    return new Promise((resolve, reject) => {
      const sql = query.getMyAddress

      connection.query(sql, userId, (error, result) => {
        if (error) reject(error)
        resolve(result)
      })
    })
  },

  getDetailMyAddressModel: (id) => {
    return new Promise((resolve, reject) => {
      const sql = query.getDetailMyAddress

      connection.query(sql, id, (error, result) => {
        if (error) reject(error)
        resolve(result)
      })
    })
  },

  deleteMyAddressModel: (id) => {
    return new Promise((resolve, reject) => {
      const sql = query.deleteMyAddress

      connection.query(sql, id, (error, result) => {
        if (error) reject(error)

        const newData = { id: id, ...result }
        resolve(newData)
      })
    })
  }
}
