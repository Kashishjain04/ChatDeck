import React from "react";
import Nav from "../components/Nav";
import Stories from "../components/Stories";

const Home = () => {
  return (
    <div className="bg-gray-100 h-screen">
      <Nav />
      <div className="w-full sm:max-w-2xl mx-auto mt-7">
        <Stories />
      </div>
    </div>
  );
};

export default Home;
