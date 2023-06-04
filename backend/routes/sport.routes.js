const express = require("express");
const { getAllSports } = require("../controllers/sports.controller");
const router = express.Router();

router.get("/", getAllSports);

module.exports = router;
