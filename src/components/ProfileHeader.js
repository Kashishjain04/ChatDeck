import React, { useState } from "react";
import { useDispatch } from "react-redux";
import firebase from "../firebase";
import { login } from "../redux/userSlice";

const auth = firebase.auth,
  db = firebase.firestore,
  storage = firebase.storage;

const ProfileHeader = ({ user }) => {
  const dispatch = useDispatch(),
    [newPic, setNewPic] = useState(null),
    [newPicURL, setNewPicURL] = useState("");

  const logoutHandler = () => {
    auth()
      .signOut()
      .catch((err) => console.log(err));
  };

  const updateImage = async () => {
    if (newPic) {
      const storageRef = storage().ref(`profilePic/${user?.email}`);
      const task = storageRef.put(newPic);
      task.on(
        "state_changed",
        function progress(snapshot) {},
        function error(err) {
          console.log(err);
        },
        function complete() {
          storageRef
            .getDownloadURL()
            .then((url) => {
              if (url) {
                db()
                  .doc(`users/${user?.email}`)
                  .update({ photoURL: url })
                  .then(() => {
                    setNewPic(null);
                    setNewPicURL("");
                    dispatch(login({ ...user, photoURL: url }));
                  });
              }
            })
            .catch((err) => console.log(err));
        }
      );
    }
  };

  return (
    <div className="flex px-4">
      <div className="profilePic w-20 h-20 sm:w-32 sm:h-32 rounded-full mr-10 sm:mr-16 overflow-hidden relative">
        <div className="profilePicOverlay absolute top-0 left-0 w-full h-full rounded-full bg-gray-600 bg-opacity-50 z-10 grid place-items-center invisible">
          <input
            type="file"
            name="image"
            accept="image/*"
            style={{ fontSize: 0 }}
            className="absolute w-full h-full rounded-full opacity-0 cursor-pointer"
            onChange={(e) => {
              setNewPic(e.target.files[0]);
              setNewPicURL(
                e?.target?.files?.[0]
                  ? URL.createObjectURL(e?.target?.files?.[0])
                  : ""
              );
            }}
          />
          <i className="bx bxs-pencil text-2xl sm:text-4xl text-white" />
        </div>
        <img
          className="w-full h-full"
          src={newPicURL !== "" ? newPicURL : user?.photoURL}
          alt="profile"
        />
      </div>
      <div className="flex flex-col justify-evenly">
        <p className="text-3xl font-medium">{user?.name}</p>
        <div className="flex space-x-6">
          <div className="flex space-x-1">
            <p className="font-semibold">
              {user?.posts?.length ? user?.posts?.length : 0}
            </p>
            <p>posts</p>
          </div>
          <div className="flex space-x-1">
            <p className="font-semibold">
              {user?.followers?.length ? user?.followers?.length : 0}
            </p>
            <p>followers</p>
          </div>
          <div className="flex space-x-1">
            <p className="font-semibold">
              {user?.following?.length ? user?.following?.length : 0}
            </p>
            <p>following</p>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          {newPic && (
            <button
              onClick={updateImage}
              className="py-1 px-3 w-max bg-gray-400 focus:outline-none"
            >
              Update Profile
            </button>
          )}
          <button
            onClick={logoutHandler}
            className="py-1 px-3 w-max bg-gray-400 focus:outline-none"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
