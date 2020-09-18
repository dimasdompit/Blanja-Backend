const connection = require("../config/database");
const query = require("../helpers/query/sizes");

module.exports = {
  getAllSizesModel: () => {
    return new Promise((resolve, reject) => {
      const sql = query.getAllSizes;
      connection.query(sql, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  },

  getSizeDetailsModel: (id) => {
    return new Promise((resolve, reject) => {
      const sql = query.getSizeDetails;
      connection.query(sql, id, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  },

  addSizesModel: (data) => {
    return new Promise((resolve, reject) => {
      const sql = query.addSizes;
      connection.query(sql, data, (error, result) => {
        if (error) reject(error);

        const newData = {
          id: result.insertId,
          ...data,
        };

        resolve(newData);
      });
    });
  },

  updateSizesModel: (data, id) => {
    return new Promise((resolve, reject) => {
      const sql = query.updateSizes;
      connection.query(sql, [data, id], (error, result) => {
        if (error) reject(error);

        const newData = {
          id,
          ...data,
        };
        resolve(newData);
      });
    });
  },

  deleteSizesModel: (id) => {
    return new Promise((resolve, reject) => {
      const sql = query.deleteSizes;
      connection.query(sql, id, (error, result) => {
        if (error) reject(error);

        const newData = {
          id,
          ...result,
        };

        resolve(newData);
      });
    });
  },
};
