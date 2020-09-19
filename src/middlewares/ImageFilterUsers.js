const upload = require("../helpers/upload/users");
const { response } = require("../helpers/response");
const ImageFilter = upload.single("image");
module.exports = (req, res, next) => {
  try {
    ImageFilter(req, res, (err) => {
      if (err) {
        return response(res, false, `${err.message} max 4 mb`, 400);
      }
      next();
    });
  } catch (error) {
    console.log(error);
  }
};
