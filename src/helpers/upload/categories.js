const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'src/images/categories')
    },
    filename: (req, file, callback) => {
        const splitName = file.originalname.split('.')
        const newName = req.body.category.split(' ').join('-')
        const ext = splitName.pop()
        callback(null, `${newName.toLowerCase()}-img.${ext}`)
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
