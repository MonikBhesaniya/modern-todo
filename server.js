const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

connectDB();
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});