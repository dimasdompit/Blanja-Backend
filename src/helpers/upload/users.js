const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/images/users/')
  },
  filename: (req, file, cb) => {
    const image = file.originalname.split('.').pop()
    cb(null, `${Date.now()}-${req.decoded.result[0].id}.${image}`)
  }
})
const filter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true)
  } else {
    req.fileValidationError = 'Only jpeg, png and jpg images allowed!'
    cb(null, false)
  }
}
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 4
  },
  fileFilter: filter
})

module.exports = upload
