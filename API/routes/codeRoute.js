const express = require("express");
const router = express.Router();
const saveCode = require("../controllers/saveCodeController");
const getCode = require("../controllers/getCode");

router.post("/saveCode", saveCode);
router.post("/getCode", getCode);

module.exports = router;