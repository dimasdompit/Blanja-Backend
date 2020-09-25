module.exports = {
  getAllProductImages: 'SELECT * FROM product_images',
  getProductImagesDetail: 'SELECT * FROM product_images WHERE product_id=?',
  insertProductImages: 'INSERT INTO product_images SET ?',
  updateProductImages: 'UPDATE product_images SET ? WHERE product_id = ?',
  deleteProductImages: 'DELETE FROM product_images WHERE product_id = ?'
}
