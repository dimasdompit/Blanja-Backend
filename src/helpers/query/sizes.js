module.exports = {
  getAllSizes: `SELECT * FROM sizes`,
  getSizeDetails: `SELECT * FROM sizes WHERE id=?`,
  addSizes: `INSERT INTO sizes SET ?`,
  updateSizes: `UPDATE sizes SET ? WHERE id=?`,
  deleteSizes: `DELETE FROM sizes WHERE id=?`,
};
