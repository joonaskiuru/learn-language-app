const express = require("express");
const wordsRouter = require("./routes/words");
const port = 3000;
const app = express();
const cors = require("cors");

const mysql = require("mysql");
require("dotenv").config();

const credentials = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

app.use(express.json());
app.use(cors());
app.use(express.static("./frontend/dist"));
app.use("/api/words", wordsRouter);

let server = undefined;
const connection = mysql.createConnection(credentials);
connection.connect((err) => {
  // mysql connection
  if (err) {
    console.error("Error connecting to MySQL:", err);
    process.exit(1);
  } else {
    console.log("MySQL connection successful.");
    connection.end();
    // ..
  }
});

// Start the server and listen on the specified port
server = app
  .listen(port, () => {
    console.log(`Server listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Error starting server:", err);
    process.exit(1);
  });

const gracefulShutdown = () => {
  console.log("Starting graceful shutdown...");
  // Close the server
  if (server) {
    console.log("Server was opened, so we can close it...");
    server.close((err) => {
      if (err) throw Error;
      process.exit(1);
    });
  }
};

process.on("SIGTERM", gracefulShutdown); // Some other app requirest shutdown.
process.on("SIGINT", gracefulShutdown); // ctrl-c
