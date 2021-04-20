import React from "react";
import { Skeleton } from "@material-ui/lab";
import { Typography } from "@material-ui/core";

const NewPost = () => {
  return (
    <div className="bg-white my-4 p-4 sm:border sm:border-gray-300 rounded-md">
      <div className="flex items-center">
        <Skeleton
          animation="wave"
          className="w-12 h-12 mr-5"
          variant="circle"
        />
        <Typography className="flex-grow" variant="h2">
          <Skeleton
            animation="wave"
            className="w-full h-12 rounded-full"
            variant="circle"
          />
        </Typography>
        <Skeleton animation="wave" className="w-9 h-9 mx-4" variant="circle" />
      </div>
      <div className="ml-16 mt-3 flex space-x-1 items-center">
        <Skeleton
          animation="wave"
          className="w-28 h-4 rounded-full ml-1"
          variant="circle"
        />
      </div>
    </div>
  );
};

export default NewPost;
