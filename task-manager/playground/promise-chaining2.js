require("../src/db/mongoose");
const Task = require("../src/models/task");

// Task.findByIdAndDelete("65d2d50996ab51ea4b9f2072")
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((result) => console.log(result))
//   .catch((e) => console.error(e));

const taskDeleteAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });

  return count;
};

taskDeleteAndCount("65d2d49108ff290e27404eaf")
  .then((result) => console.log(result))
  .catch((e) => console.log(e));
