const Team = require("../models/Team");

const getTeamBySportId = async (req, res) => {
  try {
    let { sportId } = req.query;
    sportId = Number(sportId);
    const teams = await Team.find({ sportId });

    if (!teams.length) {
      return res.status(404).json({ message: "Teams not found!" });
    }

    res.json({ teams });
  } catch (error) {
    res.json({ message: "Internal Server Error!" });
  }
};

const getTeamById = async (req, res) => {
  try {
    let { id } = req.query;
    const team = await Team.findOne({ id });

    if (!team) {
      return res.status(404).json({ message: "Team not found!" });
    }

    res.json({ team });
  } catch (error) {
    res.json({ message: "Internal Server Error!" });
  }
};

module.exports = { getTeamBySportId, getTeamById };
