const { response } = require("../helpers/response");
const { hashSync, genSaltSync, compareSync, genSalt } = require("bcrypt");
const {
  EditUserValidation,
  AddAddressValidation,
  EditAddressValidation,
} = require("../helpers/validation");
const {
  editUserModel,
  getUserModel,
  addAddressModel,
  editAddressModel,
  getMyAddressModel,
  getDetailMyAddressModel,
  deleteMyAddressModel,
} = require("../models/profile");
const fs = require("fs");

module.exports = {
  editProfile: async (req, res) => {
    try {
      const id = req.decoded.result[0].id;
      req.body.password
        ? (req.body.password = hashSync(req.body.password, genSalt(1)))
        : null;
      const data = req.body;
      const getUser = await getUserModel(id);
      let oldImage = getUser[0].image;

      if (!req.fileValidationError) {
        const image = req.file ? req.file.filename : null;
        image !== null ? (data.image = image) : null;
        const validation = await EditUserValidation(data);

        if (validation.error === undefined) {
          const result = await editUserModel(data, id);
          if (result.affectedRows === 1 && oldImage !== "user-default.png")
            fs.unlinkSync(`./src/images/users/${oldImage}`);
          return response(res, true, result, 200);
        }
        let errorMessage = validate.error.details[0].message;
        errorMessage = errorMessage.replace(/"/g, "");
        fs.unlinkSync(`./src/images/users/${data.image}`);
        return response(res, false, errorMessage, 400);
      }
      return response(res, false, req.fileValidationError, 400);
    } catch (error) {
      console.log(error);
      return response(res, false, "Internal Server Error", 500);
    }
  },
};
