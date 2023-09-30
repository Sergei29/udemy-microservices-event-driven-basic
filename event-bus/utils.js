let DB = [];

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

const writeDb = (eventList) => {
  DB = [...eventList];
  return readDb();
};

/**
 * @param { {type: string; data: Record<string, any>} } event
 */
const saveEvent = async (event) => {
  const eventList = await readDb();
  const newEventsList = [...eventList, event];
  await writeDb(newEventsList);
};

module.exports = {
  EVENT_TYPE,
  SERVICE,
  readDb,
  writeDb,
  saveEvent,
};
