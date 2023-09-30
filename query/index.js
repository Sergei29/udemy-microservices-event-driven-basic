const express = require("express");
const cors = require("cors");
const axios = require("axios");

const { readDb, SERVICE, handleEvent } = require("./utils");

const PORT = 4002;
const app = express();

app.use(cors(), express.json(), express.urlencoded({ extended: false }));

app.get("/posts", async (req, res) => {
  const posts = readDb();

  res.status(200).json(posts);
});

app.post("/events", async (req, res) => {
  /**
   * @type {{type: string; data: Record<string, any>}}
   */
  const event = req.body;

  handleEvent(event);

  res.status(204).end();
});

app.listen(PORT, async () => {
  console.log(`query service running at http://localhost:${PORT}`);

  const { data: allEvents } = await axios(`${SERVICE.EVENT_BUS}/events`);

  for (const event of allEvents) {
    handleEvent(event);
  }
});
