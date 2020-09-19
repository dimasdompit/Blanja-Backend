const joi = require("joi");
const min = "1-1-1945";

const schema = {
  editUserValidation: joi.object({
    name: joi.string().max(30),
    password: joi.string().min(6),
    birthdat_date: joi
      .date()
      .min(min)
      .message(`"date" cannot be earlier than ${min}`)
      .max("now")
      .message(`"date" cannot be later than now`)
      .required(),
    image: joi.string(),
  }),

  addAddressValidation: joi.object({
    user_id: joi.number().required(),
    name: joi.string().required(),
    type: joi.string().required(),
    address: joi.string().required(),
    telp: joi.string().min(12).max(13).required(),
    city: joi.string().required(),
    zipcode: joi.string().max(11).required(),
    province: joi.string().required(),
    country: joi.string().required(),
  }),

  editAddressValidation: joi.object({
    user_id: joi.number(),
    name: joi.string(),
    type: joi.string(),
    address: joi.string(),
    telp: joi.string().min(12).max(13),
    city: joi.string(),
    zipcode: joi.string().max(11),
    province: joi.string(),
    country: joi.string(),
  }),
};

module.exports = schema;
