import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import firebase from "../firebase";
import { selectUser } from "../redux/userSlice";

const db = firebase.firestore;

const PostCard = ({ post, id }) => {
  const user = useSelector(selectUser),
    [comment, setComment] = useState("");

  const likeHandler = () => {
    db()
      .doc(`posts/${id}`)
      .update({
        likes: db.FieldValue.arrayUnion(user.email),
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

  return (
    <div className="bg-white my-2 sm:border sm:border-gray-300 rounded-md">
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
      {post.image ? (
        <img
          onDoubleClick={likeHandler}
          src={post.image}
          alt="post"
          className="w-full border-t border-b cursor-pointer"
        />
      ) : (
        <p
          onDoubleClick={likeHandler}
          className="p-4 border-t border-b cursor-pointer"
        >
          {post.text}
        </p>
      )}
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
        <i className="bx bx-comment post-action-btn" />
        <i className="bx bx-share post-action-btn" />
      </div>
      <p className="px-4 mb-2 font-semibold text-sm">
        {post.likes?.length} likes
      </p>
      {post.image && (
        <p className="px-4 mb-2 -mt-2 line-clamp-1">
          <span className="font-semibold">{post.user.name}: </span>
          <span className="break-all">{post.text}</span>
        </p>
      )}
      {post.comments?.length !== 0 && (
        <p className="px-4 -mt-2 mb-2 text-sm text-gray-500">Comments</p>
      )}
      {post.comments?.map((comment, index) => (
        <p key={index} className="px-4 mb-2 -mt-2 line-clamp-1">
          <span className="font-semibold">{comment.userName}: </span>
          <span className="break-all">{comment.comment}</span>
        </p>
      ))}
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
