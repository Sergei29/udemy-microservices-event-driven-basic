const express = require("express");

const { validateCommentText, postEvent, EVENT_TYPE } = require("./utils");

const PORT = 4003;
const app = express();

app.use(express.json(), express.urlencoded({ extended: false }));

app.post("/events", async (req, res) => {
  /**
   * @type {
   *  {
   *   type: typeof EVENT_TYPE[keyof EVENT_TYPE];
   *   data: Record<string, any>
   *  }
   *  | undefined
   * }
   */
  const { type, data } = req.body;

  switch (type) {
    case EVENT_TYPE.COMMENT_CREATED: {
      const status = validateCommentText(data.content);
      const moderatedComment = { ...data, status };

      await postEvent(EVENT_TYPE.COMMENT_MODERATED, moderatedComment);
      res.status(204).end();
      return;
    }
    default: {
      res.status(204).end();
      return;
    }
  }
});

app.listen(PORT, () => {
  console.log(`moderation service running at http://localhost:${PORT}`);
});
