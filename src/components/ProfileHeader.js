import React from "react";
import firebase from "../firebase";

const auth = firebase.auth;

const ProfileHeader = ({ user }) => {
  const logoutHandler = () => {
    auth()
      .signOut()
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex px-4">
      <img
        className="w-20 h-20 sm:w-32 sm:h-32 rounded-full mr-10 sm:mr-16"
        src={user?.photoURL}
        alt="profile"
      />
      <div className="flex flex-col justify-evenly">
        <p className="text-3xl font-medium">{user?.name}</p>
        <div className="flex space-x-6">
          <div className="flex space-x-1">
            <p className="font-semibold">
              {user?.posts?.length ? user?.posts?.length : 0}
            </p>
            <p>posts</p>
          </div>
          <div className="flex space-x-1">
            <p className="font-semibold">
              {user?.followers?.length ? user?.followers?.length : 0}
            </p>
            <p>followers</p>
          </div>
          <div className="flex space-x-1">
            <p className="font-semibold">
              {user?.following?.length ? user?.following?.length : 0}
            </p>
            <p>following</p>
          </div>
        </div>
        <button
          onClick={logoutHandler}
          className="py-1 px-3 w-max border border-black bg-gray-400 focus:outline-none"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
