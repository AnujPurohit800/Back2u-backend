import express from "express";
import apiRouter from "./routes/apiRoutes.js";
import { PORT } from "./config/serverConfig.js";
import connectDB from "./config/dbconfig.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

