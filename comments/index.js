const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");
const { readDb, writeDb, postEvent, EVENT_TYPE } = require("./utils");

const PORT = 4001;
const app = express();

app.use(cors(), express.json(), express.urlencoded({ extended: false }));

app.get("/posts/:id/comments", async (req, res) => {
  const commentsByPostId = await readDb();
  const postComments = commentsByPostId[req.params.id] || [];

  res.status(200).json(postComments);
});

app.post("/posts/:id/comments", async (req, res) => {
  /**
   * @type {{ content: string }}
   */
  const commentInfo = req.body;
  const postId = req.params.id;
  const id = randomBytes(4).toString("hex");
  const newComment = { id, ...commentInfo };

  const commentsByPostId = await readDb();
  const currentPostComments = commentsByPostId[postId] || [];
  commentsByPostId[postId] = [...currentPostComments, newComment];

  const newCommentsByPostId = await writeDb(commentsByPostId);
  await postEvent(EVENT_TYPE.COMMENT_CREATED, { ...newComment, postId });

  res.status(201).json(newCommentsByPostId[postId]);
});

app.post("/events", async (req, res) => {
  const event = req.body;
  console.log("Event: ", event);

  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`comments service running at http://localhost:${PORT}`);
});
