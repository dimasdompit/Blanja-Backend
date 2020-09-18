const connection = require("../config/database");
const query = require("../helpers/query/colors");

module.exports = {
  getAllColorsModel: () => {
    return new Promise((resolve, reject) => {
      const sql = query.getAllColors;
      connection.query(sql, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  },

  getColorDetailsModel: (id) => {
    return new Promise((resolve, reject) => {
      const sql = query.getColorDetails;
      connection.query(sql, id, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  },

  addColorsModel: (data) => {
    return new Promise((resolve, reject) => {
      const sql = query.addColors;
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

  updateColorsModel: (data, id) => {
    return new Promise((resolve, reject) => {
      const sql = query.updateColors;
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

  deleteColorsModel: (id) => {
    return new Promise((resolve, reject) => {
      const sql = query.deleteColors;
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
