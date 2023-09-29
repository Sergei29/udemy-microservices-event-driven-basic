const express = require("express");
const cors = require("cors");

const { readDb, writeDb, EVENT_TYPE } = require("./utils");

const PORT = 4002;
const app = express();

app.use(cors(), express.json(), express.urlencoded({ extended: false }));

app.get("/posts", async (req, res) => {
  const posts = await readDb();

  res.status(200).json(posts);
});

app.post("/events", async (req, res) => {
  /**
   * @type {{type: typeof EVENT_TYPE[keyof EVENT_TYPE]; data: Record<string, any>} | undefined}
   */
  const event = req.body;
  const posts = await readDb();

  switch (event.type) {
    case EVENT_TYPE.POST_CREATED: {
      const { id, title } = event.data;
      posts[id] = { id, title, comments: [] };

      await writeDb(posts);
      break;
    }

    case EVENT_TYPE.COMMENT_CREATED: {
      const { id, content, status, postId } = event.data;
      if (typeof postId !== "string") break;
      const postFound = posts[postId];
      if (!postFound) break;

      posts[postId] = {
        ...postFound,
        comments: [...postFound.comments, { id, content, status }],
      };
      await writeDb(posts);
      break;
    }

    case EVENT_TYPE.COMMENT_UPDATED: {
      const { id, content, status, postId } = event.data;
      if (typeof postId !== "string") break;
      const postFound = posts[postId];
      if (!postFound) break;

      posts[postId] = {
        ...postFound,
        comments: postFound.comments.map((current) => {
          if (current.id === id) {
            return { ...current, content, status };
          }
          return current;
        }),
      };

      await writeDb(posts);
      break;
    }

    default:
      console.error(`Event type "${event.type}" unknown.`);
      break;
  }

  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`query service running at http://localhost:${PORT}`);
});
