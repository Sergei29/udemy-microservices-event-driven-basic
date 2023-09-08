import React from "react";

import PostCreate from "./components/PostCreate";
import PostsList from "./components/PostsList";
import { usePosts } from "./lib/hooks/usePosts";

const App = () => {
  const [posts, refetch] = usePosts();

  return (
    <div className="max-w-5xl mx-auto py-6">
      <h1 className="text-3xl font-bold underline my-4">my Blog</h1>
      <PostCreate refetch={refetch} />
      <PostsList posts={posts} refetch={refetch} />
    </div>
  );
};

export default App;
