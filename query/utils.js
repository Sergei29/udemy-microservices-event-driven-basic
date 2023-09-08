const fs = require("fs/promises");
const path = require("path");

/**
 *
 * @returns {Promise<{[postId:string]:{id: string; title: string; comments: {id: string; content: string}[];}}>}
 */
const readDb = async () => {
  const filename = path.join(process.cwd(), "db.json");
  const dataJson = await fs.readFile(filename, { encoding: "utf-8" });
  return JSON.parse(dataJson);
};

/**
 * @param {{[postId:string]:{id: string; title: string; comments: {id: string; content: string}[];}}} data
 * @returns {Promise<{[postId:string]:{id: string; title: string; comments: {id: string; content: string}[];}}>}
 */
const writeDb = async (data) => {
  const filename = path.join(process.cwd(), "db.json");
  await fs.writeFile(filename, JSON.stringify(data), { encoding: "utf-8" });
  return await readDb();
};

const EVENT_TYPE = Object.freeze({
  POST_CREATED: "PostCreated",
  COMMENT_CREATED: "CommentCreated",
  COMMENT_MODERATED: "CommentModerated",
});

module.exports = { readDb, writeDb, EVENT_TYPE };
