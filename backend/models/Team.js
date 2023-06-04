const mongoose = require("mongoose");
const { Schema } = mongoose;

const teamSchema = new Schema({
  name: {
    type: String,
  },
  city: {
    type: String,
  },
  teamLogoImage: {
    type: String,
  },
  country: {
    type: String,
  },
  sportId: {
    type: Number,
  },

  id: {
    type: Number,
  },
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
