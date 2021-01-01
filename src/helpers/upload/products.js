const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/images/products')
  },
  filename: (req, file, callback) => {
    const splitName = file.originalname.split('.')
    const ext = splitName.pop()
    if (req.body.product_name) {
      const productName = req.body.product_name.split(' ').join('-')
      callback(null, `${productName}-${Date.now()}.${ext}`)
    } else {
      const productId = req.body.product_id
      callback(null, `${productId}-${Date.now()}.${ext}`)
    }
  }
})

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png'
  ) {
    callback(null, true)
  } else {
    req.fileValidationError = 'Only .jpeg, .jpg and .png images allowed!'
    callback(null, false)
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 4 * 1024 * 1024
  }
})

module.exports = upload
