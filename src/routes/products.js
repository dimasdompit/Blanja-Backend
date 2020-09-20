const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductDetails,
  addProducts,
  updateProducts,
} = require("../controllers/ProductsController");
const tokenCheck = require("../middlewares/TokenCheck");
const { checkRole } = require("../middlewares/RoleCheck");
const ImageFilter = require("../middlewares/ImageFilterProducts");

router.get("/", tokenCheck, getAllProducts);
router.get("/:id", tokenCheck, getProductDetails);
router.post("/", tokenCheck, checkRole, ImageFilter, addProducts);
router.put("/:id", tokenCheck, checkRole, ImageFilter, updateProducts);

module.exports = router;
