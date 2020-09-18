const { response } = require("../helpers/response");
const {
  AddProductsValidation,
  UpdateProductsValidation,
} = require("../helpers/validation");
const {
  totalProductsModel,
  getAllProductsModel,
  getProductDetailsModel,
  addProductsModel,
  updateProductsModel,
  deleteProductsModel,
} = require("../models/products");
const fs = require("fs");

module.exports = {
  getAllProducts: async (req, res) => {
    const totalProducts = await totalProductsModel();
    const spreadData = {
      ...totalProducts,
    };
    const totalData = spreadData["COUNT(*)"];

    let search = req.query.search || "";
    let sort = req.query.sort || "created_at";
    let order = req.query.order || "DESC";
    let limit = parseInt(req.query.limit) || 10;
    let page = parseInt(req.query.page) || 1;

    try {
      const result = await getAllProductsModel(
        search,
        sort,
        order,
        limit,
        page
      );

      if (result[0]) {
        return response(res, true, result, 200, { totalData, page, limit });
      }
      return response(res, false, "Sorry.. Products Not Found", 404);
    } catch (error) {
      console.log(error);
      return response(res, false, "Internal Server Error", 500);
    }
  },

  getProductDetails: async (req, res) => {
    const id = req.params.id;

    try {
      const result = await getProductDetailsModel(id);

      if (result[0]) {
        return response(res, true, result, 200);
      }
      return response(res, false, `Product with ID = ${id} Not Found`, 404);
    } catch (error) {
      console.log(error);
      return response(res, false, "Internal Server Error", 500);
    }
  },

  addProducts: async (req, res) => {
    const data = req.body;

    try {
      if (req.files) {
        const fileUploads = req.files.map((file) => {
          return file["filename"];
        });
        data.image = `${fileUploads}`;
      }
      if (req.fileValidationError) {
        return response(res, false, req.fileValidationError, 400);
      }
      const validation = AddProductsValidation(data);
      if (validation.error === undefined) {
        const result = await addProductsModel(data);
        return response(res, true, result, 201);
      }
      let errorMsg = validation.error.details[0].message;
      errorMsg = errorMsg.replace(/"/g, "");
      return response(res, false, errorMsg, 401);
    } catch (error) {
      console.log(error);
      return response(res, false, "Internal Server Error", 500);
    }
  },

  updateProducts: async (req, res) => {
    try {
      const data = req.body;
      const id = req.params.id;
      let existImage = null;
      if (req.files) {
        const fileUploads = req.files.map((file, i) => {
          return file["filename"];
          // let splitImage = data.image.split(",");
          // splitImage[i] = file["filename"];
          // console.log(splitImage[i]);
        });
        data.image = `${fileUploads}`;
        console.log(data.image);
        let existData = await getProductDetailsModel(id);
        existImage = existData[0].image;
        console.log(existImage);
      }
      if (req.fileValidationError) {
        return response(res, false, req.fileValidationError, 400);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
