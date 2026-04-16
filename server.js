import express from "express";
import { connectToDatabase } from "./config/dbConnect.js";

const app = express();

app.listen(3000, async () => {
  await connectToDatabase();
  console.log("User service is running on port 3000");
});
