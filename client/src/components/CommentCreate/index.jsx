import React, { useState } from "react";

import { createComment } from "../../lib/fetch";

/**
 * @param {{ postId: string, refetch: ()=>Promise<void>; className?: string}} props
 */
const CommentCreate = ({ postId, refetch, className }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");

  /**
   * @param {React.FormEvent} event
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!comment) return;
    setIsLoading(true);
    setError(null);

    const [response, error] = await createComment(postId, comment);

    typeof error === "string" && setError(error);
    setIsLoading(false);
    setComment("");

    response &&
      setTimeout(() => {
        refetch();
      }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div>
        <textarea
          placeholder="Add a comment..."
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={2}
          className=" bg-slate-200 rounded w-full p-1"
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className=" bg-slate-500 hover:bg-slate-700 px-2 py-1 rounded-sm"
        >
          add comment
        </button>
      </div>
      {error !== null && <p className=" text-red-600 font-semibold">{error}</p>}
    </form>
  );
};

export default CommentCreate;
