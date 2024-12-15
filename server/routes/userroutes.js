const express = require("express");
const {subscribeUser} = require("../controllers/usercontroller");
const router = express.Router();

router.post("/subscribe", subscribeUser);

module.exports = router;