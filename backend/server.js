const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();
require("dotenv").config();
const teamRouter = require("./routes/team.routes");
const sportRouter = require("./routes/sport.routes");
const playerRouter = require("./routes/player.routes");

app.use(express.json({ extended: false }));
app.use(cors());

connectDB();

app.use("/api/sports", sportRouter);
app.use("/api/teams", teamRouter);
app.use("/api/players", playerRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
