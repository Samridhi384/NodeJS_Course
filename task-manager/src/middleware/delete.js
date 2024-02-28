const User = require("../models/user");
const Task = require("../models/task");

const deleteUserAndTasks = async (req, res, next) => {
  try {
    // Find the user by ID and populate their tasks
    const user = await User.findById(req.user._id).populate("tasks");

    if (!user) {
      return res.status(404).send("User not found!");
    }

    // Delete user's tasks
    await Task.deleteMany({ owner: user._id });

    // Call next middleware or route handler
    next();
  } catch (error) {
    res.status(500).send("Internal server error");
    console.log(error);
  }
};

module.exports = deleteUserAndTasks;
