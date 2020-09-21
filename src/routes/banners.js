const express = require("express");
const router = express.Router();
const tokenCheck = require("../middlewares/TokenCheck");
const { checkRole } = require("../middlewares/RoleCheck");
const ImageFilter = require("../middlewares/ImageFilterBanners");
const {
  getAllBanners,
  getBannerDetails,
  addBanners,
  editBanners,
  deleteBanners,
} = require("../controllers/BannersController");

router.get("/", getAllBanners);
router.get("/:id", getBannerDetails);
router.post("/", tokenCheck, checkRole, ImageFilter, addBanners);
router.put("/:id", tokenCheck, checkRole, ImageFilter, editBanners);
router.delete("/:id", tokenCheck, checkRole, deleteBanners);

module.exports = router;
