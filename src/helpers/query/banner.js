module.exports = {
  getAllBanners: `SELECT * FROM banner`,
  getBannerDetails: `SELECT * FROM banner WHERE id=?`,
  addBanner: `INSERT INTO banner SET ?`,
  updateBanner: `UPDATE banner SET ? WHERE id=?`,
  deleteBanner: `DELETE FROM banner WHERE id=?`,
};
