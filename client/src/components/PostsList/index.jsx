import React from "react";

import CommentCreate from "../CommentCreate";
import CommentsList from "../CommentsList";

/**
 * @param {{ posts:Record<string, {id: string; title: string; comments: { id: string; content: string;}[];}>; refetch: ()=>Promise<void>}} props
 */
const PostsList = ({ posts, refetch }) => {
  return (
    <ul className="flex flex-wrap gap-2 mt-4">
      {Object.values(posts).map((post) => {
        return (
          <li
            key={post.id}
            className=" bg-slate-400 p-2 rounded w-[30%] flex flex-col"
          >
            <h3 className="text-lg font-semibold">{post.title}</h3>

            <p className=" text-sm">{`${
              post.comments.length || "no"
            } comments`}</p>

            <CommentsList comments={post.comments} />

            <CommentCreate
              postId={post.id}
              refetch={refetch}
              className="mt-auto"
            />
          </li>
        );
      })}
    </ul>
  );
};

export default PostsList;
