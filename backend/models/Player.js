const mongoose = require("mongoose");
const { Schema } = mongoose;

const playerSchema = new Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  image: {
    type: String,
  },
  position: {
    type: String,
  },
  teamId: {
    type: Number,
  },
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
