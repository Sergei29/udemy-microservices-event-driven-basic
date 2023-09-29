const axios = require("axios");

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

/**
 * @param {string} type
 * @param {{id: string, content: string, status: string; postId: string }} data
 */
const postEvent = async (type, data) => {
  try {
    await axios.post(`${SERVICE.EVENT_BUS}/events`, {
      type,
      data,
    });
  } catch (error) {
    console.log(`"${type}" event error: `, error);
  }
};

/**
 * @param { string} content
 */
const validateCommentText = (content) => {
  if (content.toLowerCase().includes("orange")) {
    return "rejected";
  }
  return "approved";
};

module.exports = {
  postEvent,
  validateCommentText,
  EVENT_TYPE,
  SERVICE,
};
