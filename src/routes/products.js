const express = require("express");
const router = express.Router();
const { getAllProducts } = require("../controllers/ProductsController");

router.get("/", getAllProducts);

module.exports = router;
