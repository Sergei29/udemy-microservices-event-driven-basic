import { useState, useEffect, useRef, useCallback } from "react";

import { fetchPosts } from "../fetch";
import { isEmpty } from "../utils";

/**
 * @returns {[
 *  Record<string, {id: string; title: string; comments: { id: string; content: string;}[];}>,
 *  () => Promise<void>
 * ]}
 */
export const usePosts = () => {
  const [posts, setPosts] = useState({});
  /**
   * @type {React.MutableRefObject<AbortController|null>}
   */
  const controllerRef = useRef(null);
  const mountedRef = useRef(true);

  const fetchData = useCallback(async () => {
    mountedRef.current = true;
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();

    const [posts] = await fetchPosts({
      signal: controllerRef.current.signal,
    });

    if (!isEmpty(posts) && mountedRef.current) {
      setPosts(posts);
    }
  }, []);

  useEffect(() => {
    fetchData();

    return () => {
      controllerRef.current?.abort();
      mountedRef.current = false;
    };
  }, [fetchData]);

  return [posts, fetchData];
};
