import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChatForm from "../components/ChatForm";
import ChatMessages from "../components/ChatMessages";
import Nav from "../components/Nav";
import firebase from "../firebase";
import { selectUser } from "../redux/userSlice";

const db = firebase.firestore;

const Chat = (props) => {
  const userId = props.match.params.userId,
    user = useSelector(selectUser),
    chatObj = user.chats[userId],
    [chatDoc, setChatDoc] = useState(null),
    [msg, setMsg] = useState("");

  useEffect(() => {
    db()
      .doc(`chats/${chatObj.chatId}`)
      .onSnapshot((snap) => {
        if (snap.exists) {
          setChatDoc(snap.data());
        }
      });
    return () => {
      setChatDoc(null);
    };
  }, [chatObj]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (msg === "") return;
    setMsg("");
    db()
      .doc(`chats/${chatObj.chatId}`)
      .update({
        messages: db.FieldValue.arrayUnion({
          message: msg,
          timestamp: db.Timestamp.now(),
          by: {
            email: user.email,
            name: user.name,
            photoURL: user.photoURL,
          },
        }),
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Nav />
      <div className="flex-grow flex flex-col w-full sm:max-w-xl mx-auto mt-7 sm:my-7 rounded-md bg-white sm:border sm:border-gray-300">
        <div className="h-14 px-8 py-2 border-b flex items-center">
          <img
            className="rounded-full h-9 w-9 mr-4"
            src={chatObj.photoURL}
            alt="chat"
          />
          <p className="font-semibold">{chatObj.userName}</p>
        </div>
        <div className="flex flex-col flex-grow">
          <ChatMessages messages={chatDoc?.messages} />
          <ChatForm sendMessage={sendMessage} msg={msg} setMsg={setMsg} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
