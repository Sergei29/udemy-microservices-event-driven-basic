const express = require("express");
const axios = require("axios");

const { readDb, writeDb, EVENT_TYPE } = require("./utils");

const PORT = 4003;
const app = express();

app.use(express.json(), express.urlencoded({ extended: false }));

app.post("/events", async (req, res) => {
  res.status(200).json({ message: "hi" });
});

app.listen(PORT, () => {
  console.log(`moderation service running at http://localhost:${PORT}`);
});
