import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDb } from "./config/db.js";

const app = express();
const server = http.createServer(app);

app.use(express.json({ limit: "4mb" }));
app.use(cors());

app.use("/api/status", (req, res) => {
  res.send("fuck puja");
});

const PORT = process.env.PORT || 5000;


await connectDb()

server.listen(PORT, () => [
  console.log(`Server running on http://localhost:${PORT}`),
]);
