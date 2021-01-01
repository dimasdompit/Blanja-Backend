module.exports = {
  getAllProductImages: 'SELECT * FROM product_images',
  getProductImagesDetails: 'SELECT * FROM product_images WHERE id = ?',
  getProductImagesByProductId: 'SELECT * FROM product_images WHERE product_id=?',
  insertProductImages: 'INSERT INTO product_images SET ?',
  updateProductImages: 'UPDATE product_images SET ? WHERE id = ?',
  deleteProductImagesById: 'DELETE FROM product_images WHERE id = ?',
  deleteProductImages: 'DELETE FROM product_images WHERE product_id = ?'
}
