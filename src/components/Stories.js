import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import NewStory from "./NewStory";
import StoryCard from "./StoryCard";

const Stories = () => {
  const user = useSelector(selectUser);
  return (
    <ul className="stories">
      <NewStory />
      <StoryCard image={user.photoURL} userName="Kashish_jain04" />
      <StoryCard image={user.photoURL} userName="Kashish_jain04" />
      <StoryCard image={user.photoURL} userName="Kashish_jain04" />
      <StoryCard image={user.photoURL} userName="Kashish_jain04" />
      <StoryCard image={user.photoURL} userName="Kashish_jain04" />
      <StoryCard image={user.photoURL} userName="Kashish_jain04" />
      <StoryCard image={user.photoURL} userName="Kashish_jain04" />
      <StoryCard image={user.photoURL} userName="Kashish_jain04" />
      <StoryCard image={user.photoURL} userName="Kashish_jain04" />
      <StoryCard image={user.photoURL} userName="Kashish_jain04" />
      <StoryCard image={user.photoURL} userName="Kashish_jain04" />
    </ul>
  );
};

export default Stories;
