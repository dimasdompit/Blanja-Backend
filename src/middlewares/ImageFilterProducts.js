const upload = require("../helpers/upload/products");
const { response } = require("../helpers/response");
const ImageFilter = upload.array("image", 4);

module.exports = (req, res, next) => {
  try {
    ImageFilter(req, res, (error) => {
      if (error) {
        if (error.message === "Unexpected field") {
          return response(res, false, `Maximum 4 image file to upload!`, 400);
        }
        return response(res, false, `${error.message} max 10 mb`, 400);
      }
      next();
    });
  } catch (error) {
    console.log(error);
  }
};
