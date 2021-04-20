import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Nav from "../components/Nav";
import ProfilePosts from "../components/ProfilePosts";
import UserHeader from "../components/UserHeader";
import firebase from "../firebase";
import { selectUser } from "../redux/userSlice";

const db = firebase.firestore;

const User = (props) => {
  const userId = props.match.params.userId,
    [user, setUser] = useState(null),
    currentUser = useSelector(selectUser),
    [loading, setLoading] = useState(true);

  const userRef = db().doc(`users/${userId}`),
    currentUserRef = db().doc(`users/${currentUser.email}`);

  useEffect(() => {
    userRef.onSnapshot((snap) => {
      if (snap.exists) {
        setUser(snap.data());
        setLoading(false);
      }
    });

    return () => {
      setUser(null);
    };
    //eslint-disable-next-line
  }, [userId]);

  const followHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    userRef.update({
      followers: db.FieldValue.arrayUnion(currentUser.email),
    });
    currentUserRef.update({
      following: db.FieldValue.arrayUnion(userId),
    });
    // Creating Chat
    currentUserRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          if (doc.data().followers.includes(userId)) {
            if (!doc.data().chats[userId]) {
              db()
                .collection("chats")
                .add({
                  messages: [],
                })
                .then((docRef) => {
                  userRef.set(
                    {
                      chats: {
                        [currentUser.email]: {
                          userName: currentUser.name,
                          photoURL: currentUser.photoURL,
                          chatId: docRef.id,
                        },
                      },
                    },
                    { merge: true }
                  );
                  currentUserRef.set(
                    {
                      chats: {
                        [userId]: {
                          userName: user.name,
                          photoURL: user.photoURL,
                          chatId: docRef.id,
                        },
                      },
                    },
                    { merge: true }
                  );
                });
            }
          }
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const unfollowHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    userRef.update({
      followers: db.FieldValue.arrayRemove(currentUser.email),
    });
    currentUserRef
      .update({
        following: db.FieldValue.arrayRemove(userId),
      })
      .then(() => {
        setLoading(false);
      });

    // Deleting chats
    // db().doc(`chats/${user?.chats?.[currentUser.email]}`).delete();
    // userRef.set(
    //   {
    //     chats: { [currentUser.email]: db.FieldValue.delete() },
    //   },
    //   { merge: true }
    // );
    // currentUserRef.set(
    //   {
    //     chats: { [userId]: db.FieldValue.delete() },
    //   },
    //   { merge: true }
    // );
  };

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="bg-gray-100 min-h-screen">
      <Nav />
      <div className="w-full sm:max-w-2xl mx-auto mt-7">
        <UserHeader
          user={user}
          currentUser={currentUser}
          followHandler={followHandler}
          unfollowHandler={unfollowHandler}
        />
        <hr className="w-full my-4" />
        <ProfilePosts postIds={user?.posts} />
      </div>
    </div>
  );
};

export default User;
