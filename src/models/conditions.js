const connection = require("../config/database");
const query = require("../helpers/query/conditions");

module.exports = {
  getAllConditionsModel: () => {
    return new Promise((resolve, reject) => {
      const sql = query.getAllConditions;
      connection.query(sql, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  },

  getConditionDetailsModel: (id) => {
    return new Promise((resolve, reject) => {
      const sql = query.getConditionDetails;
      connection.query(sql, id, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  },

  addConditionsModel: (data) => {
    return new Promise((resolve, reject) => {
      const sql = query.addConditions;
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

  updateConditionsModel: (data, id) => {
    return new Promise((resolve, reject) => {
      const sql = query.updateConditions;
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

  deleteConditionsModel: (id) => {
    return new Promise((resolve, reject) => {
      const sql = query.deleteConditions;
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
