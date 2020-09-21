const connection = require("../config/database");
const query = require("../helpers/query/banner");

module.exports = {
  getAllBannersModel: () => {
    return new Promise((resolve, reject) => {
      const sql = query.getAllBanners;

      connection.query(sql, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  },

  getBannerDetailsModel: (id) => {
    return new Promise((resolve, reject) => {
      const sql = query.getBannerDetails;

      connection.query(sql, id, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  },

  addBannersModel: (data) => {
    return new Promise((resolve, reject) => {
      const sql = query.addBanner;

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

  updateBannersModel: (data, id) => {
    return new Promise((resolve, reject) => {
      const sql = query.updateBanner;

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

  deleteBannersModel: (id) => {
    return new Promise((resolve, reject) => {
      const sql = query.deleteBanner;

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
