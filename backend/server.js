import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDb } from "./config/db.js";
import { userRouter } from "./routes/user.route.js";
import { messageRouter } from "./routes/message.route.js";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

// Initalize socket.io server
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Store online users
export const userSocketMap = {}; // {userId: socketId }

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User connected", userId);

  if (userId) userSocketMap[userId] = socket.id;

  // Emit online users to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Middlewares
app.use(express.json({ limit: "4mb" }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
// API endpoints
app.use("/api/auth", userRouter);
app.use("/api/message", messageRouter);

const PORT = process.env.PORT || 5000;

await connectDb();
server.listen(PORT, () => [
  console.log(`Server running on http://localhost:${PORT}`),
]);
