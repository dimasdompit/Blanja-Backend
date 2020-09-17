const conditions = require("../middlewares/validation/conditions");

module.exports = {
  AddConditionsValidation: (data) => {
    return conditions.addConditionsValidation.validate(data);
  },
  UpdateConditionsValidation: (data) => {
    return conditions.updateConditionsValidation.validate(data);
  },
};
