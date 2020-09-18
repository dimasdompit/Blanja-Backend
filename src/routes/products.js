const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductDetails,
} = require("../controllers/ProductsController");

router.get("/", getAllProducts);
router.get("/:id", getProductDetails);

module.exports = router;
