const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductDetails,
  addProducts,
  updateProducts,
} = require("../controllers/ProductsController");
const ImageFilter = require("../middlewares/ImageFilterProducts");

router.get("/", getAllProducts);
router.get("/:id", getProductDetails);
router.post("/", ImageFilter, addProducts);
router.put("/:id", ImageFilter, updateProducts);

module.exports = router;
