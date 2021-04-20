import React from "react";
import { Skeleton } from "@material-ui/lab";

const Stories = () => {
  return (
    <ul className="stories">
      <li className="w-20 space-y-2">
        <Skeleton
          animation="wave"
          className="w-16 h-16 mx-auto"
          variant="circle"
        />

        <Skeleton
          animation="wave"
          className="w-16 h-3 mx-auto rounded-full"
          variant="circle"
        />
      </li>
      <li className="w-20 space-y-2">
        <Skeleton
          animation="wave"
          className="w-16 h-16 mx-auto"
          variant="circle"
        />
        <Skeleton
          animation="wave"
          className="w-16 h-3 mx-auto rounded-full"
          variant="circle"
        />
      </li>
      <li className="w-20 space-y-2">
        <Skeleton
          animation="wave"
          className="w-16 h-16 mx-auto"
          variant="circle"
        />
        <Skeleton
          animation="wave"
          className="w-16 h-3 mx-auto rounded-full"
          variant="circle"
        />
      </li>
    </ul>
  );
};

export default Stories;
