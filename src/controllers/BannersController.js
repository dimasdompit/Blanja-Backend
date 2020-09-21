const { response } = require("../helpers/response");
const {
  AddBannerValidation,
  UpdateBannerValidation,
} = require("../helpers/validation");
const {
  getAllBannersModel,
  getBannerDetailsModel,
  addBannersModel,
  updateBannersModel,
  deleteBannersModel,
} = require("../models/banner");
const fs = require("fs");

module.exports = {
  getAllBanners: async (req, res) => {
    try {
      const result = await getAllBannersModel();

      if (result[0]) {
        return response(res, true, result, 200);
      }
      return response(res, false, "Banners not found!", 404);
    } catch (error) {
      console.log(error);
      return response(res, false, "Internal Server Error", 500);
    }
  },

  getBannerDetails: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await getBannerDetailsModel(id);

      if (result[0]) {
        return response(res, true, result, 200);
      }
      return response(res, false, `Banner with ID = ${id} not found!`, 404);
    } catch (error) {
      console.log(error);
      return response(res, false, "Internal Server Error", 500);
    }
  },

  addBanners: async (req, res) => {
    try {
      const data = req.body;

      if (req.file) {
        data.image = req.file.filename;
      }
      if (req.fileValidationError) {
        return response(res, false, req.fileValidationError, 400);
      }

      const validation = AddBannerValidation(data);

      if (validation.error === undefined) {
        const result = await addBannersModel(data);
        return response(res, true, result, 201);
      }
      let errorMsg = validation.error.details[0].message;
      errorMsg = errorMsg.replace(/"/g, "");
      return response(res, false, errorMsg, 400);
    } catch (error) {
      console.log(error);
      return response(res, false, "Internal Server Error", 500);
    }
  },

  editBanners: async (req, res) => {
    try {
      const data = req.body;
      const id = req.params.id;
      let existImage = null;

      if (req.file) {
        const newImage = req.file.filename;
        data.image = newImage;
        const existData = await getBannerDetailsModel(id);
        existImage = existData[0].image;
      }
      if (req.fileValidationError) {
        return response(res, false, req.fileValidationError, 400);
      }

      const validation = UpdateBannerValidation(data);
      if (validation.error === undefined) {
        const result = await updateBannersModel(data, id);
        if (result.id === id) {
          if (existImage !== null)
            fs.unlinkSync(`./src/images/banners/${existImage}`);
          const newData = await getBannerDetailsModel(id);
          return response(res, true, newData, 200);
        }
        return response(res, false, `Banner with ID = ${id} Not Found!`, 404);
      }
      let errorMsg = validation.error.details[0].message;
      errorMsg = errorMsg.replace(/"/g, "");
      return response(res, false, errorMsg, 400);
    } catch (error) {
      console.log(error);
      return response(res, false, "Internal Server Error", 500);
    }
  },

  deleteBanners: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await getBannerDetailsModel(id);
      const result = await deleteBannersModel(id);

      if (result.affectedRows === 1) {
        const image = data[0].image;
        fs.unlinkSync(`./src/images/banners/${image}`);
        return response(res, true, result, 200);
      }
      return response(res, false, `Banner with ID = ${id} Not Found!`, 404);
    } catch (error) {
      console.log(error);
      return response(res, false, "Internal Server Error", 500);
    }
  },
};
