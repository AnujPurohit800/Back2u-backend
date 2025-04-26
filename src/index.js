import express from "express";
import apiRouter from "./routes/apiRoutes.js";
import { PORT } from "./config/serverConfig.js";
import connectDB from "./config/dbconfig.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use("/api", apiRouter);

app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello, World! back2u");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
