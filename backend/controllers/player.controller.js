const { mongoose } = require("mongoose");
const Player = require("../models/Player");

const getPlayersByTeamId = async (req, res) => {
  try {
    let { teamId } = req.query;
    teamId = Number(teamId);
    const players = await Player.find({ teamId });

    if (!players.length) {
      return res.status(404).json({ message: "Players not found!" });
    }

    res.status(200).json({ players });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const getPlayerById = async (req, res) => {
  try {
    let { id } = req.query;
    const player = await Player.findById(new mongoose.Types.ObjectId(id));

    if (!player) {
      return res.status(404).json({ message: "Player not found!" });
    }

    res.json({ player });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal Server Error!" });
  }
};

const searchPlayers = async (req, res) => {
  try {
    let { searchTerm, page, order } = req.query;
    page = parseInt(page, 10) || 1;

    const query = {
      name: { $regex: searchTerm, $options: "i" },
    };

    const totalPlayersWithoutPages = await Player.find(query).exec();

    const players = await Player.find(query)
      .limit(10)
      .skip(10 * (page - 1))
      .sort({ name: order })
      .exec();

    if (!players.length) {
      return res.status(404).json({ message: "No players match the search!" });
    }

    const totalPages = Math.ceil(totalPlayersWithoutPages.length / 10);
    res.status(200).json({
      players,
      currentPage: page,
      totalPages,
      hasNextPage: totalPages > page,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports = { getPlayerById, getPlayersByTeamId, searchPlayers };
