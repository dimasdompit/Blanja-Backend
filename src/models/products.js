const connection = require("../config/database");
const {
  queryGetAllProducts,
  queryGetProductDetails,
} = require("../helpers/query/products");

module.exports = {
  getAllProductsModel: (search, sort, order, limit, page) => {
    let keyword = `%${search}%`;
    let end = limit * page - limit;

    return new Promise((resolve, reject) => {
      const sql = queryGetAllProducts(sort, order);

      connection.query(
        sql,
        [keyword, keyword, keyword, keyword, limit, end],
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      );
    });
  },

  getProductDetailsModel: (id) => {
    return new Promise((resolve, reject) => {
      const sql = queryGetProductDetails();

      connection.query(sql, id, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  },
};
