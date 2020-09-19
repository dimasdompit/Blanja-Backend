const { response } = require("../helpers/response");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const {
  RegisterValidation,
  LoginValidation,
  forgotPassVal,
  changePassVal,
} = require("../helpers/validation");
const { registerModel, loginModel, updateUser } = require("../models/auth");
const { sendEmail } = require("../helpers/sendEmail");
const encryptor = require("simple-encryptor")(`${process.env.ENCRYPT_KEY}`);

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

  Login: async (req, res) => {
    try {
      const data = req.body;
      const validation = await LoginValidation(data);

      if (validation.error === undefined) {
        const emailCheck = await loginModel(data.email);
        if (emailCheck.length !== 0) {
          if (compareSync(data.password, emailCheck[0].password)) {
            delete emailCheck[0].password;
            return response(res, true, emailCheck, 200);
          }
          return response(res, false, "Password Wrong", 400);
        }
        return response(res, false, "Emai is not registered!", 400);
      }
      let errorMsg = validation.error.details[0].message;
      errorMsg = errorMsg.replace(/"/g, "");
      return response(res, false, errorMsg, 400);
    } catch (error) {
      console.log(error);
      return response(res, false, "Internal Server Error", 500);
    }
  },

  ForgotPassword: async (req, res) => {
    try {
      const validation = forgotPassVal(req.body);

      if (validation.error === undefined) {
        const getUser = await loginModel(req.body.email);
        if (getUser.length === 1) {
          const encrypted = encryptor.encrypt(getUser[0].email);
          const data = {
            email: getUser[0].email,
            name: getUser[0].name,
            url: `${process.env.WEB_URL}/forgot-password/${encrypted}`,
          };
          sendEmail("Change Password", data);
          return response(
            res,
            true,
            "Please check your email to change password",
            200
          );
        }
        return response(res, false, "Email is not registered!", 400);
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
