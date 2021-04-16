import React, { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import firebase from "../firebase";

const db = firebase.firestore;

const ProfilePosts = ({ postIds }) => {
  const [posts, setPosts] = useState([]),
    [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      setPosts([]);
      await postIds.forEach((id) => {
        db()
          .doc(`posts/${id}`)
          .onSnapshot((snap) => {
            if (snap.exists) {
              setPosts((prev) => [...prev, snap.data()]);
            }
          });
      });
      setLoading(false);
    };
    fetchPosts();

    return () => {
      setPosts([]);
    };

    // eslint-disable-next-line
  }, [postIds]);

  const loader = (
    <ContentLoader
      className="px-4"
      width={422}
      height={500}
      viewBox="0 0 800 800"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="2" ry="2" width="350" height="350" />
      <rect x="370" y="0" rx="2" ry="2" width="350" height="350" />
    </ContentLoader>
  );

  return loading ? (
    loader
  ) : posts.length === 0 ? (
    <p className="text-xl text-center py-10">There are no posts to show...</p>
  ) : (
    <div className="grid grid-cols-3 place-items-center gap-4 px-4">
      {posts.reverse().map((post, index) =>
        post.image === "" ? (
          <p key={index} className="max-h-44 overflow-hidden line-clamp-5">
            {post.text}
          </p>
        ) : (
          <img key={index} src={post.image} alt="post" />
        )
      )}
      {loading}
    </div>
  );
};

export default ProfilePosts;
