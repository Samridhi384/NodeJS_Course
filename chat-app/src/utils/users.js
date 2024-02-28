const users = [];

//addUser , removeUser , getUser , getRoomUser

const addUser = ({ id, username, room }) => {
  //clean the data
  username = username.trim().toLowerCase();
  username = username.charAt(0).toUpperCase() + username.slice(1);
  room = room.trim().toLowerCase();
  // room = room.charAt(0).toUpperCase() + room.slice(1);

  //validate the data

  if (!username || !room) {
    return {
      error: "Username and room required",
    };
  }

  //check the existing user
  const existingUser = users.find((user) => {
    return user.room === room && user.username === username;
  });

  //validate existing user
  if (existingUser) {
    return {
      error: "Username is in use",
    };
  }

  //store the user
  const user = { id, username, room };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

const getRoomUser = (room) => {
  room = room.trim().toLowerCase();
  return users.filter((user) => user.room === room);
};

addUser({
  id: 19,
  username: "rhea ",
  room: "xyz",
});

// console.log(users);

const res = addUser({
  id: 20,
  username: "payal",
  room: " surAt",
});
// console.log(res);

// const removedUser = removeUser(18);
// console.log(removedUser);
// console.log(users);

// const getuser = getUser(20);
// // console.log(users);
// console.log(getuser);

// const userList = getRoomUser("XYZ");
// console.log(userList);

module.exports = {
  addUser,
  removeUser,
  getUser,
  getRoomUser,
};
