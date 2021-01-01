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

  getProductImagesDetails: (id) => {
    return new Promise((resolve, reject) => {
      const sql = query.getProductImagesDetails

      connection.query(sql, id, (error, result) => {
        if (error) reject(error)
        resolve(result)
      })
    })
  },

  getProductImagesByProductIdModel: (productId) => {
    return new Promise((resolve, reject) => {
      const sql = query.getProductImagesByProductId

      connection.query(sql, productId, (error, result) => {
        if (error) reject(error)
        resolve(result)
      })
    })
  },

  insertProductImagesModel: (data) => {
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

  updateProductImagesModel: (data, id) => {
    return new Promise((resolve, reject) => {
      const sql = query.updateProductImages

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

  deleteProductImagesModel: (productId) => {
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
  },

  deleteProductImagesByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      const sql = query.deleteProductImagesById

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
