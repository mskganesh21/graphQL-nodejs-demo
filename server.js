import express from "express";
import { connectToDatabase } from "./config/dbConnect.js";
import { ApolloServer } from "@apollo/server";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.listen(3000, async () => {
  await connectToDatabase();
  console.log("User service is running on port 3000");
});
