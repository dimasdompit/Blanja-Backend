module.exports = {
  queryTotalProducts: () => {
    return `SELECT COUNT(*) FROM products`;
  },

  queryGetAllProducts: (sort, order) => {
    return `SELECT products.id, products.product_name, users.store, products.image, products.description, products.stock, products.price, conditions.condition_name, categories.category, sizes.size, colors.color, products.created_at, products.updated_at FROM products INNER JOIN users ON products.store = users.id INNER JOIN conditions ON products.condition_id = conditions.id INNER JOIN categories ON products.category_id = categories.id INNER JOIN sizes ON products.size_id = sizes.id INNER JOIN colors ON products.color_id = colors.id WHERE product_name LIKE ? OR categories.category LIKE ? OR sizes.size LIKE ? OR colors.color LIKE ? ORDER BY ${sort} ${order} LIMIT ? OFFSET ?`;
  },

  queryGetProductDetails: () => {
    return `SELECT products.id, products.product_name, products.image, products.description, products.stock, products.price, conditions.condition_name, categories.category, sizes.size, colors.color, products.created_at, products.updated_at FROM products INNER JOIN users ON products.store = users.id INNER JOIN conditions ON products.condition_id = conditions.id INNER JOIN categories ON products.category_id = categories.id INNER JOIN sizes ON products.size_id = sizes.id INNER JOIN colors ON products.color_id = colors.id WHERE products.id=?`;
  },

  queryAddProducts: () => {
    return `INSERT INTO products SET ?`;
  },

  queryUpdateProducts: () => {
    return `UPDATE products SET ? WHERE id=?`;
  },

  queryDeleteProducts: () => {
    return `DELETE FROM products WHERE id=?`;
  },
};
