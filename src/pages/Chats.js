import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import { selectUser } from "../redux/userSlice";
import firebase from "../firebase";

const db = firebase.firestore;

const Chats = () => {
  const user = useSelector(selectUser),
    [chats, setChats] = useState({});

  useEffect(() => {
    db()
      .doc(`users/${user.email}`)
      .onSnapshot((snap) => {
        if (snap.exists) {
          setChats(snap.data().chats);
        }
      });

    return () => {
      setChats({});
    };
  }, [user.email]);

  console.log(chats);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Nav />
      <div className="flex-grow w-full sm:max-w-xl mx-auto mt-7 sm:my-7 rounded-md bg-white sm:border sm:border-gray-300 py-4 overflow-y-scroll">
        {Object.keys(chats).map((chat) => (
          <Link to={`/chat/${chat}`} key={chat}>
            <div className="px-4 py-3 flex items-center border-b hover:bg-gray-200">
              <img
                className="rounded-full h-14 w-14 mr-4"
                src={user?.chats?.[chat].photoURL}
                alt="chat"
              />
              <div className="flex flex-col">
                <p>{user?.chats?.[chat].userName}</p>
                <p className="text-gray-500 text-sm">{chat}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Chats;
