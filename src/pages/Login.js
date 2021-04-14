import React from "react";
import { useDispatch } from "react-redux";
import firebase from "../firebase";
import { login } from "../redux/userSlice";

const auth = firebase.auth,
  db = firebase.firestore,
  provider = new auth.GoogleAuthProvider();

const Login = () => {
  const dispatch = useDispatch();

  const loginHandler = () => {
    auth()
      .signInWithPopup(provider)
      .then(({ additionalUserInfo }) => {
        const obj = {
          email: additionalUserInfo.profile.email,
          name: additionalUserInfo.profile.name,
          photoURL: additionalUserInfo.profile.picture,
        };
        if (additionalUserInfo.isNewUser) {
          db()
            .collection("users")
            .doc(additionalUserInfo.profile.email)
            .set(obj, { merge: true });
        }
        dispatch(login(obj));
      });
  };
  return (
    <div className="h-screen grid grid-rows-2 place-items-center">
      <img
        src="/images/logo-text.png"
        alt="logo"
        className="w-56 sm:w-72 mt-44 sm:mt-32"
      />
      <div
        className="bg-blue-500 w-48 p-1 rounded-md flex items-center -mt-28 sm:mt-0 cursor-pointer hover:shadow-xl"
        onClick={loginHandler}
      >
        <i className="bx bxl-google text-2xl border-r-2 border-white text-white px-1 mr-1" />
        <p className="text-white text-md px-1">Signin with Google</p>
      </div>
    </div>
  );
};

export default Login;
