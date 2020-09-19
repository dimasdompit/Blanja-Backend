const express = require("express");
const router = express.Router();
const { editProfile } = require("../controllers/ProfileController");
const tokenCheck = require("../middlewares/TokenCheck");
const ImageFilter = require("../middlewares/ImageFilterUsers");

router.put("/", tokenCheck, ImageFilter, editProfile);

module.exports = router;
