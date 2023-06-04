const express = require("express");
const {
  getTeamBySportId,
  getTeamById,
} = require("../controllers/teams.controller");
const router = express.Router();

router.get("/", getTeamBySportId);
router.get("/single", getTeamById);

module.exports = router;
