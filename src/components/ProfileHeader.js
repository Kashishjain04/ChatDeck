import React from "react";

const ProfileHeader = ({ user }) => {
  return (
    <div className="flex px-4">
      <img
        className="w-20 h-20 sm:w-32 sm:h-32 rounded-full mr-10 sm:mr-16"
        src={user.photoURL}
        alt="profile"
      />
      <div className="flex flex-col justify-evenly">
        <p className="text-3xl font-medium">{user.name}</p>
        <div className="flex space-x-6">
          <div className="flex space-x-1">
            <p className="font-semibold">{user.posts?.length}</p>
            <p>posts</p>
          </div>
          <div className="flex space-x-1">
            <p className="font-semibold">{user.followers?.length}</p>
            <p>followers</p>
          </div>
          <div className="flex space-x-1">
            <p className="font-semibold">{user.following?.length}</p>
            <p>following</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
