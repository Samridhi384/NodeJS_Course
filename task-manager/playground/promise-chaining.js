require("../src/db/mongoose");
const User = require("../src/models/user");

// User.findByIdAndUpdate("65cf4aa839030652b0636340", { age: 1 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 1 });
//   })
//   .then((result) => console.log(result))
//   .catch((e) => console.log(e));

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("65cf4aa839030652b0636340", 4)
  .then((result) => console.log(result))
  .catch((e) => console.log(e));
