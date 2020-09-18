module.exports = {
  login: `SELECT * FROM users WHERE email = ?`,
  register: `INSERT INTO users SET ?`,
  updateUser: `UPDATE users SET ? WHERE email = ?`,
};
