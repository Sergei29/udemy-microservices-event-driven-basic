const fs = require("fs/promises");
const path = require("path");
const axios = require("axios");

/**
 * @returns {Promise<{ [postId: string]: { id: string; content: string}[] }>}
 */
const readDb = async () => {
  const filename = path.join(process.cwd(), "db.json");
  const dataJson = await fs.readFile(filename, { encoding: "utf-8" });
  return JSON.parse(dataJson);
};

/**
 * @param {{ [postId: string]: { id: string; content: string}[] }} data
 * @returns {Promise<{ [postId: string]: { id: string; content: string}[] }>}
 */
const writeDb = async (data) => {
  const filename = path.join(process.cwd(), "db.json");
  await fs.writeFile(filename, JSON.stringify(data), { encoding: "utf-8" });
  return await readDb();
};

/**
 * @param {string} type
 * @param {{id: string, content: string, postId: string }} data
 */
const postEvent = async (type, data) => {
  try {
    await axios.post("http://localhost:4005/events", {
      type,
      data,
    });
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

module.exports = { readDb, writeDb, postEvent, EVENT_TYPE };
