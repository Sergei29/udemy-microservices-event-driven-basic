const fs = require("fs/promises");
const path = require("path");
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
 * @returns {Promise<{[postId:string]:{id:string; title: string}}>}
 */
const readDb = async () => {
  const filename = path.join(process.cwd(), "db.json");
  const dataJson = await fs.readFile(filename, { encoding: "utf-8" });
  return JSON.parse(dataJson);
};

/**
 * @param {{[postId:string]:{id:string; title: string}}} data
 * @returns {Promise<{[postId:string]:{id:string; title: string}}>}
 */
const writeDb = async (data) => {
  const filename = path.join(process.cwd(), "db.json");
  await fs.writeFile(filename, JSON.stringify(data), { encoding: "utf-8" });
  return await readDb();
};

/**
 * @param {string} type
 * @param {{id: string, title: string}} data
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

module.exports = { readDb, writeDb, postEvent, EVENT_TYPE };
