const express = require("express");
const router = express.Router();
const {
  editProfile,
  addMyAddress,
  editMyAddress,
  getMyAddress,
} = require("../controllers/ProfileController");
const tokenCheck = require("../middlewares/TokenCheck");
const ImageFilter = require("../middlewares/ImageFilterUsers");

router.put("/", tokenCheck, ImageFilter, editProfile);
router.post("/my-address", tokenCheck, addMyAddress);
router.put("/my-address/:id", tokenCheck, editMyAddress);
router.get("/my-address", tokenCheck, getMyAddress);

module.exports = router;
