const express = require("express");
const {authMiddleware} = require("../middleware/index");
const {
  createSkill,
  updateSkill,
  deleteSkill,
  getSkills,
} = require("../controllers/skillcontroller");
const router = express.Router();

router.post("/", authMiddleware, createSkill);
router.put("/:id", authMiddleware, updateSkill);
router.delete("/:id", authMiddleware, deleteSkill);
router.get("/", getSkills);

module.exports = router;