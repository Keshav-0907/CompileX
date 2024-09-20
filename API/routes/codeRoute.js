const express = require("express");
const router = express.Router();
const saveCode = require("../controllers/saveCodeController");
const getCode = require("../controllers/getCode");
const updateCode = require("../controllers/updateCode");
const getAllProjects = require("../controllers/getAllProjects");
const deleteCode = require("../controllers/deleteCode");

router.post("/saveCode", saveCode);
router.post("/getCode", getCode);
router.post("/updateCode", updateCode);
router.get("/getAllProjects", getAllProjects);
router.post("/deleteCode", deleteCode);



module.exports = router;