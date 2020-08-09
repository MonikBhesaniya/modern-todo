const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export default User = mongoose.model("Task", taskSchema);
