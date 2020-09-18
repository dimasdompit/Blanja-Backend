const conditions = require("../middlewares/validation/conditions");
const categories = require("../middlewares/validation/categories");
const colors = require("../middlewares/validation/colors");
const sizes = require("../middlewares/validation/sizes");

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

  AddSizesValidation: (data) => {
    return sizes.addSizesValidation.validate(data);
  },

  UpdateSizesValidation: (data) => {
    return sizes.updateSizesValidation.validate(data);
  },
};
