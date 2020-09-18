const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  getCategoriesDetails,
  addCategories,
  updateCategories,
  deleteCategories,
} = require("../controllers/CategoriesController");

router.get("/", getAllCategories);
router.get("/:id", getCategoriesDetails);
router.post("/", addCategories);
router.put("/:id", updateCategories);
router.delete("/:id", deleteCategories);

module.exports = router;
