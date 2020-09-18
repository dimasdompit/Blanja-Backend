const upload = require("../helpers/upload/products");
const { response } = require("../helpers/response");
const ImageFilter = upload.array("image", 4);

module.exports = (req, res, next) => {
  try {
    ImageFilter(req, res, (error) => {
      if (error) {
        return response(res, false, `${error.message} max 10 mb`, 400);
      }
      next();
    });
  } catch (error) {
    console.log(error);
  }
};
