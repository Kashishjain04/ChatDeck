import React from "react";
import Nav from "../components/Nav";
import NewPost from "../components/NewPost";
import Posts from "../components/Posts";
import Stories from "../components/Stories";

const Home = () => {
  return (
    <div className="bg-gray-100">
      <Nav />
      <div className="w-full sm:max-w-xl mx-auto mt-7">
        <Stories />
        <NewPost />
        <Posts />
      </div>
    </div>
  );
};

export default Home;
