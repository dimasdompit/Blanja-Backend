const joi = require("joi");

const schema = {
  addBannerValidation: joi.object({
    image: joi.string().required(),
  }),

  updateBannerValidation: joi.object({
    image: joi.string().required(),
  }),
};

module.exports = schema;
