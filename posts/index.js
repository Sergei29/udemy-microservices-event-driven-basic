const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");

const { readDb, writeDb, postEvent, EVENT_TYPE } = require("./utils");

const PORT = 4000;
const app = express();

app.use(cors(), express.json(), express.urlencoded({ extended: false }));

app.get("/posts", async (req, res) => {
  const posts = await readDb();

  res.status(200).json(posts);
});

app.post("/posts", async (req, res) => {
  const postInfo = req.body;
  const id = randomBytes(4).toString("hex");
  const newPost = { id, ...postInfo };
  const posts = await readDb();
  posts[id] = newPost;
  await writeDb(posts);
  await postEvent(EVENT_TYPE.POST_CREATED, newPost);

  res.status(201).json(newPost);
});

app.post("/events", async (req, res) => {
  const event = req.body;
  console.log("Event: ", event);

  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`posts service running at http://localhost:${PORT}`);
});
