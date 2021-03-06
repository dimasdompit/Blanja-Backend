const joi = require("joi");

const schema = {
  registerValidation: joi.object({
    name: joi.string().max(30).required(),
    email: joi.string().email({ minDomainSegments: 2 }).required(),
    password: joi.string().min(6).required(),
    role: joi.number(),
    store: joi.string(),
    telp: joi.string(),
  }),

  loginValidation: joi.object({
    email: joi.string().email({ minDomainSegments: 2 }).required(),
    password: joi.string().required(),
  }),

  verifyValidation: joi.object({
    code: joi.string().min(6).max(6).required(),
    email: joi.string().email({ minDomainSegments: 2 }).required(),
  }),

  forgotPassValidation: joi.object({
    email: joi.string().email({ minDomainSegments: 2 }).required(),
  }),

  changePassValidation: joi.object({
    email: joi.string().email({ minDomainSegments: 2 }).required(),
    password: joi.string().min(6).required(),
  }),
};

module.exports = schema;
