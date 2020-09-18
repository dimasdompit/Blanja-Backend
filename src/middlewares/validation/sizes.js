const joi = require("joi");

const schema = {
  addSizesValidation: joi.object({
    size: joi.string().required(),
  }),

  updateSizesValidation: joi.object({
    size: joi.string().required(),
  }),
};

module.exports = schema;
