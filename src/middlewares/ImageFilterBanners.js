const upload = require("../helpers/upload/banners");
const { response } = require("../helpers/response");
// const ImageFilter = upload.array("image", 4);
const ImageFilter = upload.single("image");

module.exports = (req, res, next) => {
  try {
    ImageFilter(req, res, (error) => {
      if (error) {
        return response(res, false, `${error.message} max 4 mb`, 400);
      }
      next();
    });
  } catch (error) {
    console.log(error);
  }
};
