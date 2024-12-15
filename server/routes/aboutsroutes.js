const express = require("express");
const { getAboutMe } = require("../controllers/aboutMeController");
const router = express.Router();

router.get("/", getAboutMe);

module.exports = router;