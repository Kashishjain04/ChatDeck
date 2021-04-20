import React from "react";
import { useSelector } from "react-redux";
import firebase from "../firebase";
import { selectUser } from "../redux/userSlice";

const db = firebase.firestore;

const ChatMessages = ({ messages }) => {
  const user = useSelector(selectUser);

  return (
    <div className="chat-messages">
      {messages?.map((msg, index) => (
        <>
          {!(
            messages[index]?.timestamp?.seconds -
              messages[index - 1]?.timestamp?.seconds <=
            3600
          ) && (
            <p className="text-sm text-gray-400 mx-auto w-max my-2">
              {new Date(
                new db.Timestamp(
                  msg.timestamp.seconds,
                  msg.timestamp.nanoseconds
                ).toMillis()
              ).toLocaleString()}
            </p>
          )}
          <div
            className={`w-max max-w-xs my-2 rounded-3xl p-2 px-4  ${
              msg.by.email === user.email ? "ml-auto bg-gray-300" : "border"
            }`}
          >
            <p className="break-all">{msg.message}</p>
          </div>
        </>
      ))}
    </div>
  );
};

export default ChatMessages;
