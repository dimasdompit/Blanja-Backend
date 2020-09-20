const joi = require("joi");

const schema = {
  addProductsValidation: joi.object({
    product_name: joi.string().required(),
    store: joi.number().required(),
    image: joi.string().required(),
    description: joi.string().required(),
    stock: joi.number().required(),
    price: joi.number().required(),
    condition_id: joi.number().required(),
    category_id: joi.number().required(),
    size_id: joi.number().required(),
    color_id: joi.number().required(),
  }),

  updateProductsValidation: joi.object({
    product_name: joi.string().required(),
    image: joi.string().required(),
    description: joi.string().required(),
    stock: joi.number().required(),
    price: joi.number().required(),
    condition_id: joi.number().required(),
    category_id: joi.number().required(),
    size_id: joi.number().required(),
    color_id: joi.number().required(),
  }),
};

module.exports = schema;
