import React, { useEffect, useState } from "react";
import firebase from "../firebase";

const db = firebase.firestore;

const UserHeader = ({ user, currentUser, followHandler, unfollowHandler }) => {
  const [isFollowing, setFollowing] = useState(null);

  useEffect(() => {
    db()
      .doc(`users/${currentUser?.email}`)
      .onSnapshot((snap) => {
        if (snap.exists) {
          setFollowing(snap.data()?.following?.includes(user?.email));
        }
      });
    setFollowing(false);

    return () => {
      setFollowing(null);
    };
  }, [user, currentUser]);

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
        {isFollowing ? (
          <button
            onClick={unfollowHandler}
            className="py-1 px-3 w-max border border-black bg-gray-400 focus:outline-none"
          >
            Unfollow
          </button>
        ) : (
          <button
            onClick={followHandler}
            className="py-1 px-3 w-max border border-black bg-gray-400 focus:outline-none"
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
};

export default UserHeader;
