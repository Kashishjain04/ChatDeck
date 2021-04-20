import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import firebase from "../firebase";

const db = firebase.firestore,
  storage = firebase.storage;

const NewPost = () => {
  const user = useSelector(selectUser),
    [image, setImage] = useState(null),
    [text, setText] = useState("");

  const addPost = (url) => {
    if (text === "") return;
    const obj = {
      user: {
        email: user.email,
        name: user.name,
        photoURL: user.photoURL,
      },
      text,
      image: url,
      likes: [],
      comments: [],
      timestamp: new Date(),
    };
    db()
      .collection("posts")
      .add(obj)
      .then((docRef) => {
        console.log(docRef);
        db()
          .doc(`users/${user?.email}`)
          .update({
            posts: db.FieldValue.arrayUnion(docRef.id),
          })
          .then(() => {
            setText("");
            setImage(null);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const submitHandler = async () => {
    if (image) {
      const storageRef = storage().ref(
        `posts/${user.email}/${new Date().toLocaleString()}-${image.name}`
      );
      const task = storageRef.put(image);
      task.on(
        "state_changed",
        function progress(snapshot) {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        function error(err) {
          console.log(err);
        },
        function complete() {
          storageRef
            .getDownloadURL()
            .then((url) => {
              addPost(url);
            })
            .catch((err) => console.log(err));
        }
      );
    } else {
      addPost("");
    }
  };

  return (
    <form className="bg-white my-4 p-4 sm:border sm:border-gray-300 rounded-md">
      <div className="flex items-center">
        <img
          className="w-12 h-12 rounded-full mr-4"
          src={user?.photoURL}
          alt="profile"
        />
        <input
          className="bg-gray-200 flex-grow rounded-full outline-none px-4 py-3"
          type="text"
          placeholder={`What's on your mind, ${user?.name} ?`}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <i
          className="bx bx-send text-2xl mx-2 hover:bg-gray-200 rounded-full h-10 w-10 grid place-items-center cursor-pointer"
          onClick={submitHandler}
        />
      </div>
      <div className="ml-16 mt-3 cursor-pointer w-max">
        <input
          type="file"
          name="image"
          accept="image/*"
          style={{ fontSize: 0 }}
          className="absolute w-20 h-8 opacity-0 cursor-pointer"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button className="flex space-x-1 items-center text-xl text-gray-500">
          <i className="bx bx-photo-album text-2xl"></i>
          <p>Photo</p>
        </button>
      </div>
    </form>
  );
};

export default NewPost;
