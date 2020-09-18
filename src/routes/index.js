const express = require("express");
const router = express.Router();
const productRoute = require("./products");
const conditionsRoute = require("./conditions");
const categoriesRoute = require("./categories");
const colorsRoute = require("./colors");

router.use("/api/v1/products", productRoute);
router.use("/api/v1/conditions", conditionsRoute);
router.use("/api/v1/categories", categoriesRoute);
router.use("/api/v1/colors", colorsRoute);

module.exports = router;
