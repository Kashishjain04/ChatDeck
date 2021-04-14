import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { login, logout, selectUser } from "./redux/userSlice";
import firebase from "./firebase";

const auth = firebase.auth;

function App() {
  const dispatch = useDispatch(),
    user = useSelector(selectUser);
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        const obj = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
        dispatch(login(obj));
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);
  return <div className="App">{user ? <Home /> : <Login />}</div>;
}

export default App;
