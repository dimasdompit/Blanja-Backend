const conditions = require("../middlewares/validation/conditions");
const categories = require("../middlewares/validation/categories");

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
};
