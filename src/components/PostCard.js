import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import firebase from "../firebase";
import { selectUser } from "../redux/userSlice";
import LoadingPostCard from "./Loading/PostCard";

const db = firebase.firestore;

const PostCard = ({ post, id }) => {
  const user = useSelector(selectUser),
    [comment, setComment] = useState(""),
    [imgLoaded, setImgLoaded] = useState(post.image === ""),
    [likeAnimate, setLikeAnimate] = useState(false);

  const likeHandler = () => {
    db()
      .doc(`posts/${id}`)
      .update({
        likes: db.FieldValue.arrayUnion(user.email),
      })
      .then(() => {
        setLikeAnimate(true);
        setTimeout(() => {
          setLikeAnimate(false);
        }, 1000);
      });
  };
  const unlikeHandler = () => {
    db()
      .doc(`posts/${id}`)
      .update({
        likes: db.FieldValue.arrayRemove(user.email),
      });
  };
  const commentHandler = (e) => {
    e.preventDefault();
    if (comment === "") return;
    db()
      .doc(`posts/${id}`)
      .update({
        comments: db.FieldValue.arrayUnion({
          comment,
          userName: user.name,
          email: user.email,
        }),
      })
      .then(() => setComment(""))
      .catch((err) => console.log(err));
  };

  const loadImage = (image) => {
    return new Promise((resolve, reject) => {
      const loadImg = new Image();
      loadImg.src = image;
      // wait 2 seconds to simulate loading time
      loadImg.onload = () => {
        resolve(image);
        setImgLoaded(true);
      };

      loadImg.onerror = (err) => reject(err);
    });
  };

  useEffect(() => {
    post.image && loadImage(post.image);
    return () => {
      setLikeAnimate(false);
    };
  }, [post]);

  return !imgLoaded ? (
    <LoadingPostCard />
  ) : (
    <div className="bg-white my-2 sm:border sm:border-gray-300 rounded-md relative">
      {/* header */}
      <div className="flex items-center px-4 py-2">
        <Link
          to={
            post.user?.email === user?.email
              ? "profile"
              : `user/${post.user?.email}`
          }
        >
          <img
            src={post.user?.photoURL}
            alt="user-profile"
            className="w-12 h-12 rounded-full mr-4"
          />
        </Link>
        <p className="text-lg font-semibold">{post.user?.name}</p>
      </div>
      {/* main content */}
      <div className="border-t border-b cursot-pointer relative">
        {/* heart */}
        {likeAnimate && (
          <div className="heart-container absolute top-0 left-0 z-10 w-full h-full grid place-items-center">
            <i className="bx bxs-heart text-white text-9xl instagram-heart" />
          </div>
        )}
        {post.image ? (
          <img
            onDoubleClick={likeHandler}
            src={post.image}
            alt="post"
            className="w-full"
          />
        ) : (
          <p onDoubleClick={likeHandler} className="p-4">
            {post.text}
          </p>
        )}
      </div>
      {/* like btn */}
      <div className="flex space-x-4 px-4 mt-1">
        {post.likes.includes(user.email) ? (
          <i
            className="bx bxs-heart text-red-600 post-action-btn fill-current"
            onClick={unlikeHandler}
          />
        ) : (
          <i
            className="bx bx-heart post-action-btn fill-current"
            onClick={likeHandler}
          />
        )}
        {/* other action btns */}
        <i className="bx bx-comment post-action-btn" />
        <i className="bx bx-share post-action-btn" />
      </div>
      <p className="px-4 mb-2 font-semibold text-sm">
        {post.likes?.length} likes
      </p>
      {/* if image post: caption */}
      {post.image && (
        <p className="px-4 mb-2 -mt-2 line-clamp-1">
          <span className="font-semibold">{post.user.name}: </span>
          <span className="break-all">{post.text}</span>
        </p>
      )}
      {/* comments */}
      {post.comments?.length !== 0 && (
        <p className="px-4 -mt-2 mb-2 text-sm text-gray-500">Comments</p>
      )}
      {post.comments?.map((comment, index) => (
        <p key={index} className="px-4 mb-2 -mt-2 line-clamp-1">
          <span className="font-semibold">{comment.userName}: </span>
          <span className="break-all">{comment.comment}</span>
        </p>
      ))}
      {/* add comment */}
      <form className="border-t flex" onSubmit={commentHandler}>
        <input
          type="text"
          className="flex-grow px-4 py-3 outline-none text-sm"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type="submit"
          className="text-blue-600 font-semibold mr-4 focus:outline-none"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default PostCard;
