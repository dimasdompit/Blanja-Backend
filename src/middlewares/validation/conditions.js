const joi = require("joi");

const schema = {
  addConditionsValidation: joi.object({
    condition_name: joi.string().required(),
  }),

  updateConditionsValidation: joi.object({
    condition_name: joi.string().required(),
  }),
};

module.exports = schema;
