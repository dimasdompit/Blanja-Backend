module.exports = {
  getAllConditions: `SELECT * FROM conditions`,
  getConditionDetails: `SELECT * FROM conditions WHERE id=?`,
  addConditions: `INSERT INTO conditions SET ?`,
  updateConditions: `UPDATE conditions SET ? WHERE id=?`,
  deleteConditions: `DELETE FROM conditions WHERE id=?`,
};
