const express = require("express");
const { logData } = require("../controller/logController");

const router = express.Router();

router.post("/", logData);

module.exports = router;