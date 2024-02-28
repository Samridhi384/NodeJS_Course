const path = require("path");
const express = require("express");
const http = require("http");
const Filter = require("bad-words");
const socketio = require("socket.io");
require("dotenv").config();
const { generateMessage, generateLocation } = require("./utils/messages");
const { addUser, removeUser, getUser, getRoomUser } = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 9000;

const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

// let count = 0;

io.on("connection", (socket) => {
  console.log("new websocket connection", socket.id);

  // //client to server
  // socket.emit("countUpdated", count);

  // //server to client
  // socket.on("increment", () => {
  //   count++;
  //   // socket.emit("countUpdated", count);
  //   io.emit("countUpdated", count);
  // });

  socket.on("join", (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options });

    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    socket.emit("message", generateMessage("Admin", "Welcome!"));
    socket.broadcast
      .to(user.room)
      .emit("message", generateMessage("Admin", `${user.username} has joined`)); //this works same as  above but sends message to everyone except the sender
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getRoomUser(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    const filter = new Filter();

    var customFilter = new Filter({ placeHolder: "x" });

    if (filter.isProfane(message)) {
      return callback(
        customFilter.clean(message) +
          " is a bad word. So it was removed. Be in limits.😒"
      );
    }

    socket.emit("message", generateMessage("You", message));
    socket.broadcast
      .to(user.room)
      .emit("message", generateMessage(user.username, message));
    callback();
  });

  socket.on("sendLocation", (coords, callback) => {
    const user = getUser(socket.id);

    socket.emit(
      "location-message",
      generateLocation(
        "You",
        `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`
      )
    );
    socket.broadcast.to(user.room).emit(
      "location-message",
      // `Location : https://www.google.com/maps/@${coords.latitude},${coords.longitude},14z?entry=ttu`

      generateLocation(
        user.username,
        `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`
      )
    );
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        generateMessage("Admin", `${user.username} has left`)
      );
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getRoomUser(user.room),
      });
    }
  });
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
