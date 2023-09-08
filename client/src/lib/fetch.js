import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { AxiosRequestConfig } from "axios";

const POSTS_API = process.env.REACT_APP_POSTS_API;
const COMMENTS_API = process.env.REACT_APP_COMMENTS_API;
const QUERY_API = process.env.REACT_APP_QUERY_API;

/**
 * @param {AxiosRequestConfig|undefined} config
 * @returns {Promise<
 *  [{[postId: string]: { id: string; title: string; comments: { id: string; content: string;}[];};}, null]
 * | [null, string]
 * >}
 */
export const fetchPosts = async (config) => {
  try {
    const { data } = await axios.get(`${QUERY_API}/posts`, config);
    return [data, null];
  } catch (error) {
    return [null, error.message || error.toString()];
  }
};

/**
 * @param {string} title
 * @param {AxiosRequestConfig|undefined} config
 */
export const createNewPost = async (title, config) => {
  try {
    const { data } = await axios.post(`${POSTS_API}/posts`, { title }, config);
    return [data, null];
  } catch (error) {
    return [null, error.message || error.toString()];
  }
};

/**
 * @param {string} postId
 * @param {string} content
 * @param {AxiosRequestConfig|undefined} config
 * @returns {Promise<[{ id: string; content: string;}[], null]|[null, string]>}
 */
export const createComment = async (postId, content, config) => {
  const url = `${COMMENTS_API}/posts/${postId}/comments`;

  try {
    const res = await axios.post(url, { content }, config);

    /**
     * @type {{ id: string; content: string;}[]}
     */
    const commentsList = res.data;
    return [commentsList, null];
  } catch (error) {
    return [null, error.message || error.toString()];
  }
};
