const express = require("express");
const app = express();
const dotenv = require("dotenv");

// const { createServer } = require("node:http");
// const { Server } = require("socket.io");
// const server = createServer(app);

dotenv.config();

const cors = require("cors");
const port = process.env.PORT || 3000;
const path = require("path");
const todosRouter = require("./todos/todosRouter");
const { connectDatabase } = require("./database");
const errorHandler = require("./errorHandler");

// const intervalInMinutes = 1; // Check every 1 minutes
// let hoursSince = 0;
// function upTime() {
//   hoursSince += 1;
//   console.info(`${hoursSince} mins have passed`);
// }
// setInterval(upTime, intervalInMinutes * 1 * 1000);
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });
let reqCount = 0;
const main = async () => {
  // Set up the interval

  app.use(express.json());
  app.use(cors()); // Enable CORS middleware

  // app.route('/')
  app.use(express.static(path.join(__dirname, "public")));

  app.use("/todos", todosRouter);
  //
  // Middleware to parse JSON requests

  //socketiochat

  // io.on("connection", (socket) => {
  //   socket.on("chat message", (msg) => {
  //     io.emit("chat message", ` ${socket.id}: ${msg}`);
  //   });
  // });

  //socketiochat

  await connectDatabase();
  // app.get("/chat", (req, res) => {
  //   res.redirect("/chat.html");
  // });
  // index page
  app.get("/", (req, res) => {
    res.sendFile("index.html");
  });

  app.get("/postTodo", (req, res) => {
    reqCount += 1;
    console.log(reqCount);
    const filePath = path.join(__dirname, "public", "postTodo.html");
    res.sendFile(filePath);
  });

  //custom middleware for routing
  //middleware devam
  app.use(errorHandler);

  // Start the server only if not in a testing environment
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

//main metodunu çağırmayı unutma
main();
//////////////
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});

module.exports = app;
