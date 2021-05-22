import React, { useState } from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import OutsideAlerter from "../hooks/OutsideAlerter";
import firebase from "../firebase";

const db = firebase.firestore,
  storage = firebase.storage;

const ChatForm = ({ chatId, user }) => {
  const [showPicker, setPicker] = useState(false),
    [image, setImage] = useState(null),
    [imageURL, setImageURL] = useState(""),
    [msg, setMsg] = useState(""),
    [imageUploading, setImageUploading] = useState(false);

  const sendMessage = (e) => {
    e.preventDefault();

    if (image) {
      setImageUploading(true);
      const storageRef = storage().ref(
        `messages/${user.email}/${new Date().toLocaleString()}-${image.name}`
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
              sendTODb(url);
            })
            .catch((err) => {
              setImageUploading(false);
              console.log(err);
            });
        }
      );
    } else {
      if (msg === "") return;
      sendTODb();
    }
  };

  const sendTODb = (url) => {
    setMsg("");
    setImage(null);
    setImageURL("");
    let chatObj = {
      timestamp: db.Timestamp.now(),
      by: {
        email: user.email,
        name: user.name,
        photoURL: user.photoURL,
      },
    };
    if (url) {
      chatObj = { ...chatObj, image: url };
    } else {
      chatObj = { ...chatObj, message: msg };
    }
    db()
      .doc(`chats/${chatId}`)
      .update({
        messages: db.FieldValue.arrayUnion(chatObj),
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className="flex border-t" onSubmit={sendMessage}>
      {showPicker && (
        <OutsideAlerter onClickAway={() => setPicker(false)}>
          <Picker
            set="apple"
            title="Pick your emoji…"
            emoji="point_up"
            onSelect={(e) => setMsg((prev) => prev + e.native + " ")}
            style={{
              position: "absolute",
              marginTop: "-420px",
              marginLeft: "1.5rem",
            }}
          />
        </OutsideAlerter>
      )}
      <div
        style={{ gridTemplateColumns: "auto 1fr auto auto" }}
        className="mx-4 sm:mx-6 px-4 place-items-end flex-grow grid border border-black rounded-3xl my-4"
      >
        <i
          className="bx bx-smile mr-1 mb-1 text-xl grid place-items-center cursor-pointer w-8 h-8 rounded-full hover:bg-gray-200"
          onClick={() => setPicker((prev) => !prev)}
        />
        <div className="w-full grid grid-cols-1 flex-grow">
          {imageURL !== "" ? (
            <div className="relative">
              <i
                onClick={() => {
                  setImage(null);
                  setImageURL("");
                }}
                className="bx bx-x w-9 h-9 absolute top-2 right-2 text-center text-3xl bg-white bg-opacity-50 rounded-full cursor-pointer"
              />
              {imageUploading && (
                <div className="z-10 absolute w-full h-full grid place-items-center bg-gray-400 bg-opacity-50">
                  <div
                    style={{ borderTopColor: "#4f99a2" }}
                    className="animate-spin rounded-full border-8 h-24 w-24 sm:h-32 sm:w-32"
                  />
                </div>
              )}
              <img className="p-2" src={imageURL} alt="msg" />
            </div>
          ) : (
            <input
              className="py-2 border-t focus:outline-none"
              type="text"
              placeholder="Message..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
          )}
        </div>
        <div className="relative ml-1 mb-1 w-8 h-8 grid place-items-center rounded-full hover:bg-gray-200">
          <i className="bx bx-camera text-xl" />
          <input
            type="file"
            name="image"
            accept="image/*"
            style={{ fontSize: 0 }}
            className="absolute top-0 left-0 w-full h-full rounded-full opacity-0 cursor-pointer"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setImageURL(
                e?.target?.files?.[0]
                  ? URL.createObjectURL(e?.target?.files?.[0])
                  : ""
              );
            }}
          />
        </div>
        <i
          onClick={sendMessage}
          className="bx bx-send ml-1 mb-1 w-8 h-8 grid place-items-center rounded-full cursor-pointer hover:bg-gray-200"
        />
      </div>
      <button className="hidden" type="submit" />
    </form>
  );
};

export default ChatForm;
