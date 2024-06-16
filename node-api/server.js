const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./app/routes/index.js");

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/subcategories-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my API" });
});

app.listen(8000, () => {
  console.log("Server is listening on ", 8000);
});
