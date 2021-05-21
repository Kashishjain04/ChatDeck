import React from "react";

const StoryImage = ({ imgId }) => {
  const deactivate = () => {
    document.getElementById(imgId).classList.remove("active");
    document.getElementById(imgId).classList.add("inactive");
  };
  return (
    <div
      id={imgId}
      className="story inactive fixed top-0 left-0 z-20 w-screen h-screen bg-gray-700 bg-opacity-90 grid place-items-center overflow-auto"
    >
      <i
        className="bx bx-x absolute top-4 right-4 sm:top-7 sm:right-7 text-white text-3xl sm:text-5xl cursor-pointer"
        onClick={deactivate}
      />
      <img
        className="h-full sm:h-11/12"
        src="https://lh3.googleusercontent.com/a-/AOh14GhfgSuVig-RNSusuO5_kYuCKLZEBIbxvssam3e8ng=s96-c"
        alt="story"
      />
    </div>
  );
};

export default StoryImage;
