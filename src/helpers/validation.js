const conditions = require("../middlewares/validation/conditions");
const categories = require("../middlewares/validation/categories");
const colors = require("../middlewares/validation/colors");

module.exports = {
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
};
