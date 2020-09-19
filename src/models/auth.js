const connection = require("../config/database");
const query = require("../helpers/query/auth");

module.exports = {
  registerModel: (data) => {
    return new Promise((resolve, reject) => {
      const sql = query.register;

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

  loginModel: (data) => {
    return new Promise((resolve, reject) => {
      const sql = query.login;

      connection.query(sql, data, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  },

  updateUser: (data, email) => {
    return new Promise((resolve, reject) => {
      const sql = query.updateUser;

      connection.query(sql, [data, email], (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  },

  insertOTP: (data) => {
    return new Promise((resolve, reject) => {
      const sql = query.sendOTP;

      connection.query(sql, data, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  },

  checkOTP: (data) => {
    return new Promise((resolve, reject) => {
      const sql = query.checkOTP;

      connection.query(sql, data, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  },

  deleteOTP: (data) => {
    return new Promise((resolve, reject) => {
      const sql = query.deleteOTP;

      connection.query(sql, data, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  },
};
