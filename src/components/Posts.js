import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import firebase from "../firebase";
import { selectUser } from "../redux/userSlice";
import PostCard from "./PostCard";

const db = firebase.firestore;

const Posts = () => {
  const user = useSelector(selectUser),
    [posts, setPosts] = useState([]);
  useEffect(() => {
    db()
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snap) => {
        setPosts([]);
        snap.docs.forEach((post) =>
          setPosts((prev) => [...prev, { id: post.id, data: post.data() }])
        );
      });
    // eslint-disable-next-line
  }, [user]);
  return (
    <div>
      {posts.map((post) => (
        <PostCard post={post.data} id={post.id} key={post.id} />
      ))}
    </div>
  );
};

export default Posts;
