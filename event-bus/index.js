const express = require("express");
const cors = require("cors");
const axios = require("axios");

const EVENT_TYPE = Object.freeze({
  POST_CREATED: "PostCreated",
  COMMENT_CREATED: "CommentCreated",
  COMMENT_MODERATED: "CommentModerated",
});
const PORT = 4005;
const app = express();

app.use(cors(), express.json(), express.urlencoded({ extended: false }));

app.post("/events", async (req, res) => {
  const event = req.body;

  axios.post("http://localhost:4000/events", event).catch((error) => {
    console.error("Post to events error: ", error.toString());
  });

  axios.post("http://localhost:4001/events", event).catch((error) => {
    console.error("Post to events error: ", error.toString());
  });

  axios.post("http://localhost:4002/events", event).catch((error) => {
    console.error("Post to events error: ", error.toString());
  });

  res.status(200).send({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`event-bus service running at http://localhost:${PORT}`);
});
