import React from "react";

/**
 * Description
 * @param {{comments: { id: string; content: string; }[]}} props
 * @returns {any}
 */
const CommentsList = ({ comments }) => {
  return (
    <ul className=" list-disc pl-4 my-2 max-h-16 overflow-y-scroll">
      {comments.map((comment) => (
        <li key={comment.id}>{comment.content}</li>
      ))}
    </ul>
  );
};

export default CommentsList;
