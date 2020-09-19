const express = require("express");
const router = express.Router();
const authRoute = require("./auth");
const profileRoute = require("./profile");
const productRoute = require("./products");
const transactionsRoute = require("./transactions");
const conditionsRoute = require("./conditions");
const categoriesRoute = require("./categories");
const colorsRoute = require("./colors");
const sizesRoute = require("./sizes");

router.use("/api/v1/auth", authRoute);
router.use("/api/v1/profile", profileRoute);
router.use("/api/v1/products", productRoute);
router.use("/api/v1/transactions", transactionsRoute);
router.use("/api/v1/conditions", conditionsRoute);
router.use("/api/v1/categories", categoriesRoute);
router.use("/api/v1/colors", colorsRoute);
router.use("/api/v1/sizes", sizesRoute);

module.exports = router;
