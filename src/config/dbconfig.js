import mongoose from "mongoose";

import { DEV_DB_URL, PROD_DB_URL, NODE_ENV } from "./serverConfig.js";

export default async function connectDB() {
  try {
    if (NODE_ENV === "development") {
      await mongoose.connect(DEV_DB_URL);
    } else if (NODE_ENV === "production") {
      await mongoose.connect(PROD_DB_URL);
    }
    console.log(`Connected to mongodb database from ${NODE_ENV} environment`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}
