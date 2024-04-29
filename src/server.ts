// import { prisma } from './database';
import { DB, PORT } from "./config";
import express from "express";
import createExpressApp from './app';
import http from "http";

const startServer = async () => {
  const app = express();

  // await connectToDB(DB);

  await createExpressApp(app);

  const server = http.createServer(app);

  server
    .listen(PORT, () =>
      console.log(`Starting Smart Drug Software backend on port ${PORT}...`)
    )
    .on("listening", () => console.log(`Smart Drug Software backend running`))
    .on("error", (err) => {
      console.log(
        `An error occurred on the Smart Drug Software backend: ${err}\nshutting down app..`
      );
      process.exit();
    });
};

startServer();
