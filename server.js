const express = require("express");
const connectDB = require("./config/db");

connectDB();
const app = express();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("App Running");
});

app.use("/api/user", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/task", require("./routes/api/task"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
