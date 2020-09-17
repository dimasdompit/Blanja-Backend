const express = require("express");
const router = express.Router();
const productRoute = require("./products");

router.use("/api/products", productRoute);

module.exports = router;
