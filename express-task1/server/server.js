const express = require("express");
const app = express();
const cors = require("cors");
const logSystem = require("./middleware/logSystem");
const router = require("./routes/router");
let ejs = require("ejs");
const { default: axios } = require("axios");
const mockUrl =
  process.env.MOCK_API_URL ||
  "https://66798d8318a459f639506e8f.mockapi.io/api/Clubs";

app.use(express.json());
app.use(cors());
require("dotenv").config();

app.set("view engine", "ejs");
app.get("/clubs", async (req, res) => {
  const response = await axios.get(`${mockUrl}`);
  const clubs = response.data;
  res.render("clubs", {
    clubs: clubs,
  });
});

const port = process.env.PORT || 5000;
const host = process.env.HOST || "localhost";

app.use(logSystem);

app.use("/api/clubs", router);

app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}/`);
});
