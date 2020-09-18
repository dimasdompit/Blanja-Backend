const joi = require("joi");

const schema = {
  addCategoriesValidation: joi.object({
    category: joi.string().required(),
  }),
  updateCategoriesValidation: joi.object({
    category: joi.string().required(),
  }),
};

module.exports = schema;
