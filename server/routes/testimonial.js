const express = require("express");
const {
  createTestimonial,
  getTestimonials,
} = require("../controllers/testimonialController");
const router = express.Router();

router.post("/", createTestimonial);
router.get("/", getTestimonials);

module.exports = router;