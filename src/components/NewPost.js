import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import firebase from "../firebase";

const db = firebase.firestore,
  storage = firebase.storage;

const NewPost = () => {
  const user = useSelector(selectUser),
    [image, setImage] = useState(null),
    [text, setText] = useState(""),
    [displayURL, setDisplayURL] = useState(""),
    [imageUploading, setImageUploading] = useState(false);

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
    setText("");
    setImage(null);
    setDisplayURL("");
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
            // setText("");
            // setImage(null);
            // setDisplayURL("");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (image) {
      setImageUploading(true);
      const storageRef = storage().ref(
        `posts/${user.email}/${new Date().toDateString()}-${image.name}`
      );
      const task = storageRef.put(image);
      task.on(
        "state_changed",
        function progress(snapshot) {},
        function error(err) {
          console.log(err);
          setImageUploading(false);
        },
        function complete() {
          storageRef
            .getDownloadURL()
            .then((url) => {
              setImageUploading(false);
              addPost(url);
            })
            .catch((err) => {
              setImageUploading(false);
              console.log(err);
            });
        }
      );
    } else {
      addPost("");
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-white my-4 p-4 sm:border sm:border-gray-300 rounded-md"
    >
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
          onChange={(e) => {
            setImage(e.target.files[0]);
            setDisplayURL(
              e?.target?.files?.[0]
                ? URL.createObjectURL(e?.target?.files?.[0])
                : ""
            );
          }}
        />
        <button className="flex space-x-1 items-center text-xl text-gray-500">
          <i className="bx bx-photo-album text-2xl"></i>
          <p>Photo</p>
        </button>
      </div>
      {displayURL !== "" && (
        <div className="w-11/12 mx-auto relative">
          <i
            onClick={() => {
              setImage(null);
              setDisplayURL("");
            }}
            className="bx bx-x w-9 h-9 absolute top-0 right-0 text-center text-3xl bg-white bg-opacity-50 rounded-full cursor-pointer"
          />
          {imageUploading && (
            <div className="z-10 absolute w-full h-full grid place-items-center bg-gray-400 bg-opacity-50">
              <div
                style={{ borderTopColor: "#4f99a2" }}
                className="animate-spin rounded-full border-8 h-24 w-24 sm:h-32 sm:w-32"
              />
            </div>
          )}
          <img src={displayURL} alt="preview" className="w-full" />
        </div>
      )}
    </form>
  );
};

export default NewPost;
