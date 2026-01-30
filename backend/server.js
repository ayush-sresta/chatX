import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDb } from "./config/db.js";
import { userRouter } from "./routes/user.route.js";

const app = express();
const server = http.createServer(app);

// Middlewares
app.use(express.json({ limit: "4mb" }));
app.use(cors());

// API endpoints
app.use("/api/auth", userRouter);

const PORT = process.env.PORT || 5000;

await connectDb();
server.listen(PORT, () => [
  console.log(`Server running on http://localhost:${PORT}`),
]);
