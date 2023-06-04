const express = require("express");
const {
  getPlayerById,
  getPlayersByTeamId,
  searchPlayers,
} = require("../controllers/player.controller");
const router = express.Router();

router.get("/", getPlayersByTeamId);
router.get("/single", getPlayerById);
router.get("/search", searchPlayers);

module.exports = router;
