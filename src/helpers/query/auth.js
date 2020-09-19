module.exports = {
  login: `SELECT * FROM users WHERE email = ?`,
  register: `INSERT INTO users SET ?`,
  updateUser: `UPDATE users SET ? WHERE email = ?`,
  sendOTP: `INSERT INTO otp SET ?`,
  checkOTP: "SELECT * FROM otp WHERE email = ?",
  deleteOTP: "DELETE FROM otp WHERE email = ?",
  updateUser: "UPDATE users SET ? WHERE email=?",
};
