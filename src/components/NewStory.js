import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";

const NewStory = () => {
  const user = useSelector(selectUser);
  return (
    <li className="w-16 sm:w-20 break-all space-y-1">
      <div className="bg-transparent h-16 w-16 sm:h-20 sm:w-20 p-0.5 rounded-full cursor-pointer">
        <div className="bg-white rounded-full p-0.5 grid place-items-center overflow-hidden">
          <img
            src={user.photoURL}
            alt="story-profile"
            className="rounded-full "
          />
        </div>
      </div>
      <p className="w-max mx-auto text-xs sm:text-sm">Your story</p>
    </li>
  );
};

export default NewStory;
