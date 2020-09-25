const connection = require('../config/database')
const query = require('../helpers/query/categories')

module.exports = {
  getAllCategoriesModel: () => {
    return new Promise((resolve, reject) => {
      const sql = query.getAllCategories

      connection.query(sql, (error, result) => {
        if (error) reject(error)
        resolve(result)
      })
    })
  },

  getCategoriesDetailsModel: (id) => {
    return new Promise((resolve, reject) => {
      const sql = query.getCategoriesDetails

      connection.query(sql, id, (error, result) => {
        if (error) reject(error)
        resolve(result)
      })
    })
  },

  addCategoriesModel: (data) => {
    return new Promise((resolve, reject) => {
      const sql = query.addCategories

      connection.query(sql, data, (error, result) => {
        if (error) reject(error)

        const newData = {
          id: result.insertId,
          ...data
        }
        resolve(newData)
      })
    })
  },

  updateCategoriesModel: (data, id) => {
    return new Promise((resolve, reject) => {
      const sql = query.updateCategories

      connection.query(sql, [data, id], (error, result) => {
        if (error) reject(error)

        const newData = {
          id,
          ...data
        }
        resolve(newData)
      })
    })
  },

  deleteCategoriesModel: (id) => {
    return new Promise((resolve, reject) => {
      const sql = query.deleteCategories

      connection.query(sql, id, (error, result) => {
        if (error) reject(error)

        const newData = {
          id,
          ...result
        }
        resolve(newData)
      })
    })
  }
}
