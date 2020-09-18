module.exports = {
  queryGetAllProducts: (sort, order) => {
    return `SELECT products.id, products.product_name, products.image, products.description, products.stock, products.price, conditions.condition_name, categories.category, sizes.size, colors.color, products.created_at, products.updated_at FROM products INNER JOIN conditions ON products.condition_id = conditions.id INNER JOIN categories ON products.category_id = categories.id INNER JOIN sizes ON products.size_id = sizes.id INNER JOIN colors ON products.color_id = colors.id WHERE product_name LIKE ? OR categories.category LIKE ? OR sizes.size LIKE ? OR colors.color LIKE ? ORDER BY ${sort} ${order} LIMIT ? OFFSET ?`;
  },
};