import React from "react";

const StoryCard = ({ image, userName }) => {
  return (
    <li className="w-16 sm:w-20 break-all space-y-1">
      <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 h-16 w-16 sm:h-20 sm:w-20 p-0.5 rounded-full cursor-pointer">
        <div className="bg-white rounded-full p-0.5 grid place-items-center overflow-hidden">
          <img src={image} alt="story-profile" className="rounded-full " />
        </div>
      </div>
      <p className="line-clamp-1 text-xs sm:text-sm">{userName}</p>
    </li>
  );
};

export default StoryCard;
