require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const database = require("./src/config/database");
const routes = require("./src/routes");

database.connect((error) => {
  if (error) throw error;
  console.log("Database Connected!");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use(routes);
app.use("/images", express.static("src/images"));
app.get("*", (req, res) => {
  res.status(404).send("Not Found");
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Server running on port ${process.env.APP_PORT}`);
});
