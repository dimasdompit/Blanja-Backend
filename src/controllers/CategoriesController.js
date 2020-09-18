const { response } = require("../helpers/response");
const {
  AddCategoriesValidation,
  UpdateCategoriesValidation,
} = require("../helpers/validation");
const {
  getAllCategoriesModel,
  getCategoriesDetailsModel,
  addCategoriesModel,
  updateCategoriesModel,
  deleteCategoriesModel,
} = require("../models/categories");

module.exports = {
  getAllCategories: async (req, res) => {
    try {
      const result = await getAllCategoriesModel();

      if (result[0]) {
        return response(res, true, result, 200);
      }
      return response(res, false, `Sorry.. Categories Not Found`, 404);
    } catch (error) {
      console.log(error);
      return response(res, false, "Internal Server Error", 500);
    }
  },
};
