const connection = require('../config/database')
const query = require('../helpers/query/product_images')

module.exports = {
  getAllProductImagesModel: () => {
    return new Promise((resolve, reject) => {
      const sql = query.getAllProductImages

      connection.query(sql, (error, result) => {
        if (error) reject(error)
        resolve(result)
      })
    })
  },

  getProductImagesDetail: (productId) => {
    return new Promise((resolve, reject) => {
      const sql = query.getProductImagesDetail

      connection.query(sql, productId, (error, result) => {
        if (error) reject(error)
        resolve(result)
      })
    })
  },

  insertProductImages: (data) => {
    return new Promise((resolve, reject) => {
      const sql = query.insertProductImages

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

  updateProductImages: (data, productId) => {
    return new Promise((resolve, reject) => {
      const sql = query.updateProductImages

      connection.query(sql, [data, productId], (error, result) => {
        if (error) reject(error)

        const newData = {
          productId,
          ...data
        }
        resolve(newData)
      })
    })
  },

  deleteProductImages: (productId) => {
    return new Promise((resolve, reject) => {
      const sql = query.deleteProductImages

      connection.query(sql, productId, (error, result) => {
        if (error) reject(error)

        const newData = {
          productId,
          ...result
        }
        resolve(newData)
      })
    })
  }
}
