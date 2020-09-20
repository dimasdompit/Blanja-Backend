module.exports = {
  insertTransaction: `INSERT INTO transactions SET ?`,
  insertTransactionDetails: `INSERT INTO transaction_details SET ?`,
  getAllTransactions: `SELECT tr.*, a.name as receiver, a.address, a.city, a.province, a.zipcode, a.telp, a.country, u.name FROM transactions tr JOIN users u ON u.id = tr.user_id JOIN address a ON a.id = tr.shipping_address`,
  getTransactionDetails: `SELECT tr.*, p.product_name as productName, p.price as productPrice, s.size, c.color, p.image as productImage FROM transaction_details tr JOIN products p ON p.id = tr.product_id JOIN sizes s ON s.id = p.size_id JOIN colors c ON c.id = p.color_id WHERE tr.order_id = ?`,
  getMyTransactions: `SELECT tr.*, u.name, a.name as receiver, a.address, a.city, a.province, a.zipcode, a.telp, a.country FROM transactions tr JOIN users u ON u.id = tr.user_id JOIN address a ON a.id = tr.shipping_address WHERE tr.user_id = ?`,
};
