const express = require("express");
const router = express.Router();
const {
  getAllSizes,
  getSizeDetails,
  addSizes,
  updateSizes,
  deleteSizes,
} = require("../controllers/SizesController");

router.get("/", getAllSizes);
router.get("/:id", getSizeDetails);
router.post("/", addSizes);
router.put("/:id", updateSizes);
router.delete("/:id", deleteSizes);

module.exports = router;
