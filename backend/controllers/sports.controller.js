const Sport = require("../models/Sport");

const getAllSports = async (req, res) => {
  const sports = await Sport.find({});
  res.json({ sports });
};

module.exports = { getAllSports };
