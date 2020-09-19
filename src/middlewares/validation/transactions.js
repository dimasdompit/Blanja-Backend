const joi = require("joi");

const schema = {
  insertTransactionValidation: joi.object({
    user_id: joi.number().required(),
    shipping_address: joi.number().required(),
    total: joi.number().required(),
  }),
};

module.exports = schema;
