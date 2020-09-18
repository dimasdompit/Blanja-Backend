const auth = require("../middlewares/validation/auth");
const products = require("../middlewares/validation/products");
const conditions = require("../middlewares/validation/conditions");
const categories = require("../middlewares/validation/categories");
const colors = require("../middlewares/validation/colors");
const sizes = require("../middlewares/validation/sizes");

module.exports = {
  RegisterValidation: (data) => {
    return auth.registerValidation.validate(data);
  },
  LoginValidation: (data) => {
    return auth.loginValidation.validate(data);
  },
  AddProductsValidation: (data) => {
    return products.addProductsValidation.validate(data);
  },

  UpdateProductsValidation: (data) => {
    return products.updateProductsValidation.validate(data);
  },

  AddConditionsValidation: (data) => {
    return conditions.addConditionsValidation.validate(data);
  },

  UpdateConditionsValidation: (data) => {
    return conditions.updateConditionsValidation.validate(data);
  },

  AddCategoriesValidation: (data) => {
    return categories.addCategoriesValidation.validate(data);
  },

  UpdateCategoriesValidation: (data) => {
    return categories.updateCategoriesValidation.validate(data);
  },

  AddColorsValidation: (data) => {
    return colors.addColorsValidation.validate(data);
  },

  UpdateColorsValidation: (data) => {
    return colors.updateColorsValidation.validate(data);
  },

  AddSizesValidation: (data) => {
    return sizes.addSizesValidation.validate(data);
  },

  UpdateSizesValidation: (data) => {
    return sizes.updateSizesValidation.validate(data);
  },
};
