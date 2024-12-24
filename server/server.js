import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const PORT = 3000;
let userCount = 0;
const app = express();
app.use(cors({ origin: "http://localhost:5173" })); // Allow only the frontend's origin

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("Server is running!");
});

io.on("connection", (socket) => {
  console.log("> A user connected:", socket.id);
  userCount = userCount + 1;
  console.log("> Total users:", userCount);
  socket.on("send_message", (data) => {
    io.emit("receive_message", data); 
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    userCount = userCount - 1;
    console.log("> Total users:", userCount);
  });
});

httpServer.listen(PORT, () => {
  console.log(
    `> Server is running on http://localhost:${PORT}\n> started at ${new Date()}`
  );
});
