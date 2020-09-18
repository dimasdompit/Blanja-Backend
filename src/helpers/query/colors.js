module.exports = {
  getAllColors: `SELECT * FROM colors`,
  getColorDetails: `SELECT * FROM colors WHERE id=?`,
  addColors: `INSERT INTO colors SET ?`,
  updateColors: `UPDATE colors SET ? WHERE id=?`,
  deleteColors: `DELETE FROM colors WHERE id=?`,
};
