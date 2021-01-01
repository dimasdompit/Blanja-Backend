const { response } = require('../helpers/response')
const {
    getAllProductImagesModel,
    getProductImagesDetails,
    getProductImagesByProductIdModel,
    insertProductImagesModel,
    updateProductImagesModel,
    deleteProductImagesByIdModel
} = require('../models/product_images')
const fs = require('fs')

module.exports = {
    getAllProductImages: async (req, res) => {
        try {
            const results = await getAllProductImagesModel()
            if (results[0]) {
                return response(res, true, 'Get All Product Images Success', results, 200)
            }
            return response(res, false, 'Product Images Not Found', [], 404)
        } catch (error) {
            console.log(error)
            return response(res, false, 'Internal Server Error', [], 500)
        }
    },

    getProductImagesDetails: async (req, res) => {
        const id = req.params.id

        try {
            const result = await getProductImagesDetails(id)

            if (result[0]) {
                return response(res, true, 'Get Product Images Details Success', result[0], 200)
            }
            return response(res, false, `Product Images with ID = ${id} Not Found`, [], 404)
        } catch (error) {
            console.log(error)
            return response(res, false, 'Internal Server Error', [], 500)
        }
    },

    getProductImagesByProductId: async (req, res) => {
        const productId = req.params.id

        try {
            const result = await getProductImagesByProductIdModel(productId)

            if (result[0]) {
                return response(res, true, 'Get Product Images By Product ID Success', result, 200)
            }
            return response(res, false, `Product Images with Product ID = ${productId} Not Found`, [], 404)
        } catch (error) {
            console.log(error)
            return response(res, false, 'Internal Server Error', [], 500)
        }
    },

    insertProductImages: async (req, res) => {
        const data = req.body

        try {
            const imageDetails = await getProductImagesByProductIdModel(data.product_id)
            if (req.files) {
                // data.image = req.file.filename
                req.files.map(async (file) => {
                    if (imageDetails.length <= 4) {
                        const dataImage = {
                            product_id: data.product_id,
                            image: file.filename
                        }
                        await insertProductImagesModel(dataImage)
                    } else {
                        return response(res, false, 'Maximum 4 image to upload', [], 300)
                    }
                })
            }
            if (req.fileValidationError) {
                return response(res, false, req.fileValidationError, [], 400)
            }

            const result = await getProductImagesByProductIdModel(data.product_id)
            return response(res, true, 'Add Product Images Success', result, 201)
        } catch (error) {
            console.log(error)
            return response(res, false, 'Internal Server Error', [], 500)
        }
    },

    updateProductImages: async (req, res) => {
        const data = req.body
        const id = parseInt(req.params.id)
        let existImage = null

        try {
            // const imageDetails = await getProductImagesDetails(id)
            // data.product_id = imageDetails[0].product_id

            if (req.files) {
                const newImage = req.files[0].filename
                data.image = newImage
                const existData = await getProductImagesDetails(id)
                existImage = existData[0].image
            }
            if (req.fileValidationError) {
                return response(res, false, req.fileValidationError, [], 400)
            }

            const result = await updateProductImagesModel(data, id)
            if (result.id === id) {
                if (existImage !== null) fs.unlinkSync(`./src/images/products/${existImage}`)
                const newData = await getProductImagesDetails(id)
                return response(res, true, 'Update Product Images Success', newData[0], 200)
            }
            return response(res, false, `Product Image with ID = ${id} Not Found`, [], 404)
        } catch (error) {
            console.log(error)
            return response(res, false, 'Internal Server Error', [], 500)
        }
    },

    deleteProductImages: async (req, res) => {
        const id = parseInt(req.params.id)

        try {
            const data = await getProductImagesDetails(id)
            const result = await deleteProductImagesByIdModel(id)
            if (result.affectedRows === 1) {
                const image = data[0].image
                fs.unlinkSync(`./src/images/products/${image}`)
                const newResult = {
                    id: result.id
                }
                return response(res, true, 'Product Images Successfully Removed', newResult, 200)
            }
            return response(res, false, `Product Images with ID = ${id} Not Found`, [], 404)
        } catch (error) {
            console.log(error)
            return response(res, false, 'Internal Server Error', [], 500)
        }
    }
}
