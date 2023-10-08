const cors = require("cors");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

let numUsers = 0;
let userValues = {};

io.on("connection", (socket) => {
  numUsers++;
  console.log(`User connected. There are now ${numUsers} ser(s)`);
  console.log("socket.id: " + socket.id);
  socket.emit("userValues", userValues);

  socket.on("message", (message) => {
    console.log("Received message:", message);
    console.log("Uservalues: ", userValues);
    userValues[socket.id] = message;
    io.emit("userValues", userValues);
  });

  socket.on("disconnect", () => {
    numUsers--;
    console.log(`User disconnected. There are now ${numUsers} user(s)`);
    delete userValues[socket.id];
    io.emit("userValues", userValues);
    io.emit("disconnection", { numUsers: numUsers });
    socket.disconnect(true);
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
