import React from "react";

const StoryCard = ({ image, userName }) => {
  return (
    <li className="w-16 break-all space-y-1">
      <div className="skill-tag">
        <div className="bg-white rounded-full p-0.5 grid place-items-center overflow-hidden">
          <img src={image} alt="story-profile" className="rounded-full " />
        </div>
      </div>
      <p className="line-clamp-1 text-xs sm:text-sm">{userName}</p>
    </li>
  );
};

export default StoryCard;
