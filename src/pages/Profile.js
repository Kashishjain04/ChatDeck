import React from "react";
import { useSelector } from "react-redux";
import Nav from "../components/Nav";
import ProfileHeader from "../components/ProfileHeader";
import ProfilePosts from "../components/ProfilePosts";
import { selectUser } from "../redux/userSlice";

const Profile = () => {
  const user = useSelector(selectUser);
  return (
    <div className="bg-gray-100 min-h-screen">
      <Nav />
      <div className="w-full sm:max-w-2xl mx-auto mt-7">
        <ProfileHeader user={user} />
        <hr className="w-full my-4" />
        <ProfilePosts postIds={user.posts} />
      </div>
    </div>
  );
};

export default Profile;
