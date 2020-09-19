const auth = require("../middlewares/validation/auth");
const products = require("../middlewares/validation/products");
const conditions = require("../middlewares/validation/conditions");
const categories = require("../middlewares/validation/categories");
const colors = require("../middlewares/validation/colors");
const sizes = require("../middlewares/validation/sizes");

module.exports = {
  // AUTH Validations
  RegisterValidation: (data) => {
    return auth.registerValidation.validate(data);
  },
  LoginValidation: (data) => {
    return auth.loginValidation.validate(data);
  },

  VerifyValidation: (data) => {
    return auth.verifyValidation.validate(data);
  },

  forgotPassVal: (data) => {
    return auth.forgotPassValidation.validate(data);
  },
  changePassVal: (data) => {
    return auth.changePassValidation.validate(data);
  },

  // PRODUCTS Validations
  AddProductsValidation: (data) => {
    return products.addProductsValidation.validate(data);
  },

  UpdateProductsValidation: (data) => {
    return products.updateProductsValidation.validate(data);
  },

  // CONDITIONS Validations
  AddConditionsValidation: (data) => {
    return conditions.addConditionsValidation.validate(data);
  },

  UpdateConditionsValidation: (data) => {
    return conditions.updateConditionsValidation.validate(data);
  },

  // CATEGORIES Validations
  AddCategoriesValidation: (data) => {
    return categories.addCategoriesValidation.validate(data);
  },

  UpdateCategoriesValidation: (data) => {
    return categories.updateCategoriesValidation.validate(data);
  },

  // COLORS Validations
  AddColorsValidation: (data) => {
    return colors.addColorsValidation.validate(data);
  },

  UpdateColorsValidation: (data) => {
    return colors.updateColorsValidation.validate(data);
  },

  // SIZES Validations
  AddSizesValidation: (data) => {
    return sizes.addSizesValidation.validate(data);
  },

  UpdateSizesValidation: (data) => {
    return sizes.updateSizesValidation.validate(data);
  },
};
