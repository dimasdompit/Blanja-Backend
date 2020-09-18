const express = require("express");
const router = express.Router();
const productRoute = require("./products");
const conditionsRoute = require("./conditions");
const categoriesRoute = require("./categories");

router.use("/api/products", productRoute);
router.use("/api/conditions", conditionsRoute);
router.use("/api/categories", categoriesRoute);

module.exports = router;
