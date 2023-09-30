let DB = {};

const SERVICE = Object.freeze({
  CLIENT: "http://localhost:3000",
  COMMENTS: "http://localhost:4001",
  EVENT_BUS: "http://localhost:4005",
  POSTS: "http://localhost:4000",
  QUERY: "http://localhost:4002",
  MODERATION: "http://localhost:4003",
});

const EVENT_TYPE = Object.freeze({
  POST_CREATED: "PostCreated",
  COMMENT_CREATED: "CommentCreated",
  COMMENT_MODERATED: "CommentModerated",
  COMMENT_UPDATED: "CommentUpdated",
});

const readDb = () => {
  return DB;
};

const writeDb = (data) => {
  DB = { ...data };
  return readDb();
};

/**
 * @param { {type: string, data:Record<string, any> }} event
 */
const handleEvent = ({ type, data }) => {
  console.log("handleEvent() :>> ", { type, data });
  switch (type) {
    case EVENT_TYPE.POST_CREATED: {
      const posts = readDb();
      const { id, title } = data;
      posts[id] = { id, title, comments: [] };

      return writeDb(posts);
    }

    case EVENT_TYPE.COMMENT_CREATED: {
      const posts = readDb();
      const { id, content, status, postId } = data;
      if (typeof postId !== "string") break;
      const postFound = posts[postId];
      if (!postFound) break;

      posts[postId] = {
        ...postFound,
        comments: [...postFound.comments, { id, content, status }],
      };

      return writeDb(posts);
    }

    case EVENT_TYPE.COMMENT_UPDATED: {
      const posts = readDb();
      const { id, content, status, postId } = data;
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

      return writeDb(posts);
    }

    default:
      console.error(`Event type "${type}" unknown.`);
      return;
  }
};

module.exports = { readDb, writeDb, EVENT_TYPE, SERVICE, handleEvent };
