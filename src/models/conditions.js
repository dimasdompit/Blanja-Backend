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

  getConditionDetails: (id) => {
    return new Promise((resolve, reject) => {
      const sql = query.getConditionDetails;
      connection.query(sql, id, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  },

  addConditions: (data) => {
    return new Promise((resolve, reject) => {
      const sql = query.addConditions;
      connection.query(sql, data, (error, result) => {
        if (error) reject(error);

        const newData = {
          id: result.id,
          ...data,
        };

        resolve(newData);
      });
    });
  },

  updateConditions: (data, id) => {
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

  deleteConditions: (id) => {
    return new Promise((resolve, reject) => {
      const sql = query.deleteConditions;
      connection.query(sql, id, (error, result) => {
        if (error) reject(error);

        const newData = {
          id,
          ...result,
        };
      });
    });
  },
};
