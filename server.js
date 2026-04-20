import express from "express";
import { connectToDatabase } from "./config/dbConnect.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import typeDefs from "./schemas/typeDefs.js";
import resolvers from "./schemas/resolvers.js";
import models from "./model/index.js";
import productLoader from "./loaders/productLoader.js";

const app = express();

app.use(cors());
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

app.use(
  "/graphql",
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async () => ({
      models,
      loaders: {
        productLoader: productLoader,
      },
    }),
  }),
);

app.listen(3000, async () => {
  await connectToDatabase();
  console.log("🚀 Server running at http://localhost:3000/graphql");
});
