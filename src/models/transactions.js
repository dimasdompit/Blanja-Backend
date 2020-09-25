const connection = require('../config/database')
const query = require('../helpers/query/transactions')

module.exports = {
  insertTransactionsModel: (data) => {
    return new Promise((resolve, reject) => {
      const sql = query.insertTransaction

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

  insertTransactionDetailsModel: (data) => {
    return new Promise((resolve, reject) => {
      const sql = query.insertTransactionDetails

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

  getAllTransactionsModel: () => {
    return new Promise((resolve, reject) => {
      const sql = query.getAllTransactions

      connection.query(sql, (error, result) => {
        if (error) reject(error)
        resolve(result)
      })
    })
  },

  getMyTransactionsModel: (userId) => {
    return new Promise((resolve, reject) => {
      const sql = query.getMyTransactions

      connection.query(sql, userId, (error, result) => {
        if (error) reject(error)
        resolve(result)
      })
    })
  },

  getTransactionDetailsModel: (id) => {
    return new Promise((resolve, reject) => {
      const sql = query.getTransactionDetails

      connection.query(sql, id, (error, result) => {
        if (error) reject(error)
        resolve(result)
      })
    })
  }
}
