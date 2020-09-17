const express = require("express");
const router = express.Router();
const productRoute = require("./products");
const conditionsRoute = require("./conditions");

router.use("/api/products", productRoute);
router.use("/api/conditions", conditionsRoute);

module.exports = router;
