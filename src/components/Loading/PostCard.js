import React from "react";
import { Skeleton } from "@material-ui/lab";
import { Typography } from "@material-ui/core";

const PostCard = () => {
  return (
    <div className="bg-white my-2 sm:border sm:border-gray-300 rounded-md">
      <div className="flex items-center px-4 py-2">
        <Skeleton
          animation="wave"
          className="w-12 h-12 mr-5"
          variant="circle"
        />
        <Typography variant="h4">
          <Skeleton
            animation="wave"
            className="w-32 h-7 rounded-full"
            variant="circle"
          />
        </Typography>
      </div>
      <div className="border-t border-b h-96">
        <Skeleton className="w-full h-full transform-none" animation="wave" />
      </div>
      <div className="m-4">
        <Typography variant="h6" className="my-2">
          <Skeleton
            animation="wave"
            className="w-40 h-5 rounded-full"
            variant="circle"
          />
        </Typography>
        <Typography variant="h6" className="my-2">
          <Skeleton
            animation="wave"
            className="w-24 h-5 rounded-full"
            variant="circle"
          />
        </Typography>
        <Typography variant="h6" className="my-2">
          <Skeleton
            animation="wave"
            className="w-64 h-5 rounded-full"
            variant="circle"
          />
        </Typography>
      </div>
    </div>
  );
};

export default PostCard;
