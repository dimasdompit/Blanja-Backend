const express = require("express");
const router = express.Router();
const productRoute = require("./products");
const conditionsRoute = require("./conditions");
const categoriesRoute = require("./categories");
const colorsRoute = require("./colors");

router.use("/api/products", productRoute);
router.use("/api/conditions", conditionsRoute);
router.use("/api/categories", categoriesRoute);
router.use("/api/colors", colorsRoute);

module.exports = router;
