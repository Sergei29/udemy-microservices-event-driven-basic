import React from "react";

const COLOR = Object.freeze({
  approved: "green",
  rejected: "red",
  pending: "blue",
});

/**
 * Description
 * @param {{comments: { id: string; content: string; status: 'approved'|'pending'|'rejected'; }[]}} props
 * @returns {any}
 */
const CommentsList = ({ comments }) => {
  return (
    <ul className=" list-disc pl-4 my-2 max-h-16 overflow-y-scroll">
      {comments.map(({ id, content, status }) => (
        <li key={id}>
          {content}{" "}
          <small
            className={`text-xs font-semibold text-${COLOR[status]}-600 px-1 border border-${COLOR[status]}-600 rounded`}
          >
            {status}
          </small>
        </li>
      ))}
    </ul>
  );
};

export default CommentsList;
