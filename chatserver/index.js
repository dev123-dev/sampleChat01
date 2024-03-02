const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
const PORT = 5000;

app.post("/", (req, res) => res.send("Socket server working..."));

io.on("connection", (socket) => {
  console.log("hit", socket.id);
  console.log("New client connected");

  socket.on("message", (data) => {
    console.log("got");
    io.emit("message", data);
  });

  socket.on("selectedValue", (data) => {
    console.log("Received selected value from client:", data);
    io.emit("selectedValue", data); // Broadcast selected value to all connected clients
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
