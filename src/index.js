import express from "express";
import apiRouter from "./routes/apiRoutes.js";
import { PORT } from "./config/serverConfig.js";
import connectDB from "./config/dbconfig.js";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
const app = express();

const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use("/api", apiRouter);

const io = new Server(server, {
  cors: {
    origin: "*", // frontend URL in production
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello, World! back2u");
});


const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("User connected: ", socket.id);

  // Save userId with socketId when user joins
  socket.on("join", ({ userId }) => {
    onlineUsers.set(userId, socket.id);
    console.log("User joined:", userId);
  });

  // Handle sending a message
  socket.on("sendMessage", ({ chatRoomId, senderId, receiverId, content }) => {
    
    const receiverSocketId = onlineUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", {
        chatRoomId,
        senderId,
        content,
        timestamp: new Date(),
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: ", socket.id);
    for (const [userId, id] of onlineUsers.entries()) {
      if (id === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
