const express = require("express");
const mongoose = require("mongoose");
const compression = require("compression");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(compression());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public", "assets")));
//app.use(express.static(path.join(__dirname, "public", process.env.NODE_ENV === "production" ? "build" : "dist")));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
