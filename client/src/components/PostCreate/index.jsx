import React, { useState } from "react";

import { createNewPost } from "../../lib/fetch";

const PostCreate = ({ refetch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title) return;
    setIsLoading(true);
    setError(null);
    const [response, error] = await createNewPost(title);

    typeof error === "string" && setError(error);
    setIsLoading(false);
    setTitle("");

    response &&
      setTimeout(() => {
        refetch();
      }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1">
      <h2 className="text-2xl mb-2">Create new post</h2>
      <div className="flex flex-col gap-1 max-w-sm">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className=" p-2 rounded bg-slate-300"
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className=" bg-orange-500 hover:bg-orange-700 px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
      {error !== null && <p className=" text-red-600 font-semibold">{error}</p>}
    </form>
  );
};

export default PostCreate;
