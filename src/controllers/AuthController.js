const { response } = require("../helpers/response");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const {
  RegisterValidation,
  LoginValidation,
  forgotPassVal,
  changePassVal,
} = require("../helpers/validation");
const { registerModel, loginModel, updateUser } = require("../models/auth");

module.exports = {
  Register: async (req, res) => {
    try {
      const data = req.body;
      const validation = RegisterValidation(data);

      if (validation.error === undefined) {
        // data.store = req.body.store || "";
        // data.telp = req.body.telp || "";
        data.password = hashSync(req.body.password, genSaltSync(1));
        const checkEmail = await loginModel(data.email);
        if (checkEmail.length === 0) {
          const result = await registerModel(data);
          delete result.password;
          return response(res, true, result, 201);
        }
        return response(res, false, "Email has been registered!", 400);
      }
      let errorMsg = validation.error.details[0].message;
      errorMsg = errorMsg.replace(/"/g, "");
      return response(res, false, errorMsg, 400);
    } catch (error) {
      console.log(error);
      return response(res, false, "Internal Server Error", 500);
    }
  },
};
