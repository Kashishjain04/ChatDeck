import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import ChatForm from "../components/ChatForm";
import ChatMessages from "../components/ChatMessages";
import Nav from "../components/Nav";
import firebase from "../firebase";
import { selectUser } from "../redux/userSlice";

const db = firebase.firestore;

const Chat = (props) => {
  const history = useHistory(),
    userId = props.match.params.userId,
    user = useSelector(selectUser),
    chatObj = user.chats[userId],
    [chatDoc, setChatDoc] = useState(null);

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
          <i
            onClick={() => history.goBack()}
            className="bx bx-arrow-back ml-auto text-2xl grid place-items-center cursor-pointer w-9 h-9 rounded-full text-center p-1 hover:bg-gray-200"
          />
        </div>
        <div className="flex flex-col flex-grow">
          <ChatMessages messages={chatDoc?.messages} />
          <ChatForm chatId={chatObj.chatId} user={user} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
