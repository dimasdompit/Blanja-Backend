const express = require("express");
const router = express.Router();
const { getAllCategories } = require("../controllers/CategoriesController");

router.get("/", getAllCategories);

module.exports = router;
