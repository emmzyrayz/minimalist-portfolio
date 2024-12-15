const express = require("express");
const {authMiddleware} = require("../middleware/index");
const {
  createProject,
  updateProject,
  deleteProject,
  getProjects,
} = require("../controllers/projectController");
const router = express.Router();

router.post("/", authMiddleware, createProject);
router.put("/:id", authMiddleware, updateProject);
router.delete("/:id", authMiddleware, deleteProject);
router.get("/", getProjects);

module.exports = router;