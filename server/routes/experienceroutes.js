const express = require("express");
const {authMiddleware} = require("../middleware/index");
const {
  createExperience,
  updateExperience,
  deleteExperience,
  getExperiences,
} = require("../controllers/experiencecontroller");
const router = express.Router();

router.post("/", authMiddleware, createExperience);
router.put("/:id", authMiddleware, updateExperience);
router.delete("/:id", authMiddleware, deleteExperience);
router.get("/", getExperiences);

module.exports = router;