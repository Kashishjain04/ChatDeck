import React from "react";
import Nav from "../components/Loading/Nav";
import NewPost from "../components/Loading/NewPost";
import PostCard from "../components/Loading/PostCard";
import Stories from "../components/Loading/Stories";

const LoadingHome = () => {
  return (
    <div className="bg-gray-100">
      <Nav />
      <div className="w-full sm:max-w-xl mx-auto mt-7">
        <Stories />
        <NewPost />
        <PostCard />
        <PostCard />
      </div>
    </div>
  );
};

export default LoadingHome;
