const express = require("express");
const cors = require("cors");
const axios = require("axios");

const { SERVICE, saveEvent, readDb } = require("./utils");

const PORT = 4005;
const app = express();

app.use(cors(), express.json(), express.urlencoded({ extended: false }));

app.get("/events", async (req, res) => {
  const eventsList = readDb();

  res.status(200).json(eventsList);
});

app.post("/events", async (req, res) => {
  const event = req.body;

  saveEvent(event);

  axios.post(`${SERVICE.POSTS}/events`, event).catch((error) => {
    console.error("Post to 4000/events error: ", error.toString());
  });

  axios.post(`${SERVICE.COMMENTS}/events`, event).catch((error) => {
    console.error("Post to 4001/events error: ", error.toString());
  });

  axios.post(`${SERVICE.QUERY}/events`, event).catch((error) => {
    console.error("Post to 4002/events error: ", error.toString());
  });

  axios.post(`${SERVICE.MODERATION}/events`, event).catch((error) => {
    console.error("Post to 4003/events error: ", error.toString());
  });

  res.status(200).send({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`event-bus service running at http://localhost:${PORT}`);
});
