const upload = require('../helpers/upload/products')
const { response } = require('../helpers/response')
// const ImageFilter = upload.array("image", 4);
// const ImageFilter1 = upload.single("image1");
// const ImageFilter2 = upload.single("image2");
// const ImageFilter3 = upload.single("image3");
// const ImageFilter4 = upload.single("image4");

/* ========== UPLOAD ANY ========== */
const ImageFilter = upload.any()

module.exports = (req, res, next) => {
  try {
    ImageFilter(req, res, (error) => {
      if (error) {
        // if (error.message === 'Unexpected field') {
        //   return response(res, false, 'Maximum 4 image file to upload!', 400)
        // }
        return response(res, false, `${error.message} max 4 mb`, 400)
      }
      next()
    })
  } catch (error) {
    console.log(error)
  }
}
