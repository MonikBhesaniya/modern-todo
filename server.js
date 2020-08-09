const express = require("express");
const connectDB = require("./config/db");

connectDB();
const app = express();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("App Running");
});

app.use("/api/user", require("./Routes/api/user"));
app.use("/api/auth", require("./Routes/api/auth"));
app.use("/api/task", require("./Routes/api/task"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
