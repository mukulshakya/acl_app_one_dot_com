require("dotenv").config();
const express = require("express");
const app = express();
const api = require("./api");

const PORT = process.env.port || 3030;

// Parse request body
app.use(express.json());

// Ping route
app.get("/", (req, res) => {
  return res.send("OK");
});

// Register routes
app.use(api);

// Spin up server
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
