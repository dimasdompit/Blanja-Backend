const connection = require('../config/database')
const {
  queryGetAllProducts,
  queryGetProductDetails,
  queryAddProducts,
  queryUpdateProducts,
  queryDeleteProducts,
  queryTotalProducts
} = require('../helpers/query/products')

module.exports = {
  totalProductsModel: () => {
    return new Promise((resolve, reject) => {
      const sql = queryTotalProducts()

      connection.query(sql, (error, result) => {
        if (error) reject(error)
        resolve(...result)
      })
    })
  },

  getAllProductsModel: (search, sort, order, limit, page) => {
    const keyword = `%${search}%`
    const end = limit * page - limit

    return new Promise((resolve, reject) => {
      const sql = queryGetAllProducts(sort, order)

      connection.query(
        sql,
        [keyword, keyword, keyword, keyword, limit, end],
        (error, result) => {
          if (error) reject(error)
          resolve(result)
        }
      )
    })
  },

  getProductDetailsModel: (id) => {
    return new Promise((resolve, reject) => {
      const sql = queryGetProductDetails()

      connection.query(sql, id, (error, result) => {
        if (error) reject(error)
        resolve(result)
      })
    })
  },

  addProductsModel: (data) => {
    return new Promise((resolve, reject) => {
      const sql = queryAddProducts()

      connection.query(sql, data, (error, result) => {
        if (error) reject(error)

        const newData = {
          id: result.insertId,
          ...data
        }
        console.log(result)
        resolve(newData)
      })
    })
  },

  updateProductsModel: (data, id) => {
    return new Promise((resolve, reject) => {
      const sql = queryUpdateProducts()

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

  deleteProductsModel: (id) => {
    return new Promise((resolve, reject) => {
      const sql = queryDeleteProducts()

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
