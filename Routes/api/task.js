const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Task = require("../../models/Task");

//@Route   POST api/task
//@desc    create a task
//@access  Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required").notEmpty(),
      check("catagory", "Catagory is required").notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, catagory } = req.body;

      const task = new Task({
        title,
        catagory,
        user: req.user.id,
      });

      await task.save();

      res.json({ task });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@Route   PUT api/task/:task_id
//@desc    update a task
//@access  Private
router.put(
  "/:task_id",
  [
    auth,
    [
      check("title", "Title is required").notEmpty(),
      check("catagory", "Catagory is required").notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, catagory } = req.body;
      const id = mongoose.Types.ObjectId(req.params.task_id);
      let task = await Task.findOne({ _id: id });
      if (!task) {
        return res.status(400).json({ errors: [{ msg: "Invalid Task ID" }] });
      }

      task = await Task.findOneAndUpdate(
        { _id: id },
        { $set: { title, catagory } },
        { new: true }
      );

      res.json({ task });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@Route   DELETE api/task/:task_id
//@desc    delete a task
//@access  Private
router.delete(
  "/:task_id",
  auth,

  async (req, res) => {
    try {
      const id = mongoose.Types.ObjectId(req.params.task_id);
      let task = await Task.findOne({ _id: id });
      if (!task) {
        return res.status(400).json({ errors: [{ msg: "Invalid Task ID" }] });
      }

      task = await Task.findOneAndDelete({ _id: id });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@Route   GET api/task
//@desc    get all tasks
//@access  Private
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json({ tasks });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
