const axios = require("axios");
const { randomBytes } = require("crypto");

let DB = {};

const SERVICE = Object.freeze({
  CLIENT: "http://localhost:3000",
  COMMENTS: "http://localhost:4001",
  EVENT_BUS: "http://localhost:4005",
  POSTS: "http://localhost:4000",
  QUERY: "http://localhost:4002",
  MODERATION: "http://localhost:4003",
});

const readDb = () => {
  return DB;
};

const writeDb = (eventList) => {
  DB = { ...eventList };
  return readDb();
};

/**
 * @param {string} type
 * @param {{id: string, content: string, status: string; postId: string }} data
 */
const postEvent = async (type, data) => {
  try {
    await axios.post(`${SERVICE.EVENT_BUS}/events`, { type, data });
  } catch (error) {
    console.log(`"${type}" event error: `, error);
  }
};

const EVENT_TYPE = Object.freeze({
  POST_CREATED: "PostCreated",
  COMMENT_CREATED: "CommentCreated",
  COMMENT_MODERATED: "CommentModerated",
  COMMENT_UPDATED: "CommentUpdated",
});

/**
 * @param {{ content: string; postId: string }} initialData
 * @returns {{id: string; content: string; status: string; postId: string }}
 */
const createNewComment = (initialData) => ({
  id: randomBytes(4).toString("hex"),
  status: "pending",
  ...initialData,
});

/**
 * @param {{
 *    id: string; content: string; status: string; postId: string
 * }} comment
 * @returns {{
 *    id: string; content: string; status: string; postId: string
 * }|null}
 */
const updateComment = (comment) => {
  try {
    const comments = readDb();
    if (!comments[comment.postId]) {
      throw new Error("Not found comments list");
    }

    const foundComment = comments[comment.postId].find(
      (current) => current.id === comment.id,
    );

    if (!foundComment) {
      throw new Error("Not found the comment");
    }

    const newComment = { ...foundComment, ...comment };
    const newPostComments = comments[comment.postId].map((current) => {
      if (current.id === newComment.id) {
        return newComment;
      }
      return current;
    });

    comments[comment.postId] = newPostComments;
    writeDb(comments);

    return newComment;
  } catch (error) {
    console.log("uodate comment error: ", error);
    return null;
  }
};

module.exports = {
  readDb,
  writeDb,
  postEvent,
  createNewComment,
  updateComment,
  EVENT_TYPE,
  SERVICE,
};
