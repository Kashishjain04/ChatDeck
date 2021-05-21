import React from "react";
import { Skeleton } from "@material-ui/lab";

const Nav = () => {
  return (
    <div className="bg-white sticky top-0 h-14 py-2 px-4 border-b-2 z-10">
      <div className="sm:max-w-2xl mx-auto flex items-center justify-between overflow-hidden">
        <div className="brand">ChatDeck</div>
        <div className="flex items-center space-x-3">
          <i className="bx bx-comment text-2xl w-9 h-9 rounded-full text-center p-1 hover:bg-gray-200" />
          <div className="p-0.5 w-9 h-9 rounded-full">
            <Skeleton
              animation="wave"
              className="w-full h-full"
              variant="circle"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
