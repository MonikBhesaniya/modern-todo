const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

connectDB();
const app = express();

app.use(express.json({ extended: false }));

app.use("/api/user", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/task", require("./routes/api/task"));

if (process.env.NODE_ENV) {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
