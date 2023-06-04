const mongoose = require("mongoose");
const { Schema } = mongoose;

const sportSchema = new Schema({
  name: {
    type: String,
  },
  logo: {
    type: String,
  },
  id: {
    type: Number,
  },
});

const Sport = mongoose.model("Sport", sportSchema);

module.exports = Sport;
