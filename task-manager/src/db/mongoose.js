const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  // useCreateIndex: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
});

//testing user data

// const me = new User({
//   name: "            Rhea       ",
//   email: "rhea@gmail.com     ",
//   age: 25,
//   password: "              1234567 ",
// });

// me.save()
//   .then(() => console.log(me))
//   .catch((e) => console.log(e));

//testing task data

// const task1 = new Task({
//   description: "           TypeScript    ",
// });

// task1
//   .save()
//   .then(() => console.log(task1))
//   .catch((e) => console.log(e));
