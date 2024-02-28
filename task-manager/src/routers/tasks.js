const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const Task = require("../models/task");

//create new task
router.post("/tasks", auth, async (req, res) => {
  try {
    // const task = new Task(req.body);

    const task = new Task({
      ...req.body,
      owner: req.user._id,
    });
    const result = await task.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
  // task
  //   .save()
  //   .then(() => {
  //     res.status(201).send(task);
  //   })
  //   .catch((e) => {
  //     res.status(400).send(e);
  // });
});

//get all tasks whose completed = true
router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    // const tasks = await Task.find({});
    await req.user.populate({
      path: "tasks",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
        // sort: {
        //   // createdAt: 1, // -1 for descending
        //   completed: -1,
        // },
      },
    });
    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send();
  }
  // Task.find({})
  //   .then((tasks) => {
  //     res.send(tasks);
  //   })
  //   .catch((e) => {
  //     res.status(500).send();
  //   });
});

//get single tasks
router.get("/tasks/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;

    // const task = await Task.findById(_id);
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      res.status(400).send("Task not found");
    }
    res.send(task);
  } catch (error) {
    res.status(401).send();
    console.log(error);
  }

  // Task.findById(_id)
  //   .then((task) => {
  //     if (!task) {
  //       res.status(400).send("Task not found");
  //     }

  //     res.send(task);
  //   })
  //   .catch((e) => {
  //     res.status(500).send();
  //   });
});

//update a task
router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    res.status(400).send({ error: "Invalid update!" });
  }

  try {
    // const updatedTask = await Task.findById(req.params.id);

    const updatedTask = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    // const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    if (!updatedTask) {
      res.status(400).send("Task not found");
    }

    updates.forEach((update) => (updatedTask[update] = req.body[update]));
    await updatedTask.save();
    res.send(updatedTask);
  } catch (error) {
    res.status(400).send();
  }
});

//delete a task
router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;

    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    // const task = await Task.findByIdAndDelete(_id);

    if (!task) {
      res.status(404).send("Task not found");
    }
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;

// const main = async () => {
//   // const task = await Task.findById("65d483d55c950cf817cf4c22").populate(
//   //   "owner"
//   // );
//   // console.log(task.owner);

//   const user = await User.findById("65d42a9bc074076b18ddef0e");
//   await user.populate("tasks");
//   // console.log(user.tasks);
// };

// main();
