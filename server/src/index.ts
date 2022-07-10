import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./routes/auth.route";
import bodyParser from "body-parser";
import { dashboardHandler } from "./controllers/dashboard.controller";
import { roomHandler } from "./controllers/room.controller";
import "dotenv/config";

const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/", authRouter);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", socket => {
  dashboardHandler(socket, io);
  roomHandler(socket);
});

mongoose.connect(process.env.MONGODB_URL as string).then(() =>
  server.listen(port, () => {
    console.log(`Listening to the server on ${port}`);
  }),
);
