const { response } = require("../helpers/response");
const { getAllProductsModel } = require("../models/products");
const fs = require("fs");

module.exports = {
  getAllProducts: async (req, res) => {
    let search = req.query.search || "";
    let sort = req.query.sort || "created_at";
    let order = req.query.order || "DESC";
    let limit = parseInt(req.query.limit) || 10;
    let page = req.query.page || 1;

    try {
      const result = await getAllProductsModel(
        search,
        sort,
        order,
        limit,
        page
      );

      if (result[0]) {
        console.log(result[0]);
        return response(res, true, result, 200, { page, limit });
      }
      return response(res, false, "Sorry.. Products Not Found", 404);
    } catch (error) {
      console.log(error);
      return response(res, false, "Internal Server Error", 500);
    }
  },
};