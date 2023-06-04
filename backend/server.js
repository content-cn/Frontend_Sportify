const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();
require("dotenv").config();
const teamRouter = require("./routes/team.routes");
const sportRouter = require("./routes/sport.routes");
const playerRouter = require("./routes/player.routes");
const path = require("path");

app.use(express.json({ extended: false }));
app.use(cors());

connectDB();

app.use("/api/sports", sportRouter);
app.use("/api/teams", teamRouter);
app.use("/api/players", playerRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, ".", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
