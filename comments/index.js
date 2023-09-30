const express = require("express");
const cors = require("cors");
const {
  readDb,
  writeDb,
  postEvent,
  createNewComment,
  updateComment,
  EVENT_TYPE,
} = require("./utils");

const PORT = 4001;
const app = express();

app.use(cors(), express.json(), express.urlencoded({ extended: false }));

app.get("/posts/:id/comments", async (req, res) => {
  const commentsByPostId = readDb();
  const postComments = commentsByPostId[req.params.id] || [];

  res.status(200).json(postComments);
});

app.post("/posts/:id/comments", async (req, res) => {
  /**
   * @type {{ content: string }}
   */
  const commentInfo = req.body;
  const postId = req.params.id;

  const newComment = createNewComment({ ...commentInfo, postId });

  const commentsByPostId = readDb();
  const currentPostComments = commentsByPostId[postId] || [];
  commentsByPostId[postId] = [...currentPostComments, newComment];

  const newCommentsByPostId = writeDb(commentsByPostId);
  await postEvent(EVENT_TYPE.COMMENT_CREATED, newComment);

  res.status(201).json(newCommentsByPostId[postId]);
});

app.post("/events", async (req, res) => {
  const event = req.body;

  if (event.type === EVENT_TYPE.COMMENT_MODERATED) {
    const updated = updateComment(event.data);
    if (updated) {
      await postEvent(EVENT_TYPE.COMMENT_UPDATED, updated);
    }
  }

  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`comments service running at http://localhost:${PORT}`);
});
