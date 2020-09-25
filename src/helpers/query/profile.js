module.exports = {
  editUser: 'UPDATE users SET ? WHERE id = ?',
  getData: 'SELECT * FROM users where id = ?',
  addAddress: 'INSERT INTO address SET ?',
  editAddress: 'UPDATE address SET ? WHERE id = ?',
  getMyAddress: 'SELECT * FROM address where user_id = ?',
  getDetailMyAddress: 'SELECT * FROM address where id = ?',
  deleteMyAddress: 'DELETE FROM address where id = ?'
}
