import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { login, logout, selectUser } from "./redux/userSlice";
import firebase from "./firebase";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "./pages/Profile";
import User from "./pages/User";
import Chats from "./pages/Chats";
import Chat from "./pages/Chat";
import LoadingHome from "./pages/LoadingHome";

const auth = firebase.auth,
  db = firebase.firestore;

function App() {
  const dispatch = useDispatch(),
    user = useSelector(selectUser),
    [loading, setLoading] = useState(true);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        db()
          .doc(`users/${user.email}`)
          .onSnapshot((snap) => {
            if (snap.exists) {
              dispatch(login(snap.data()));
              setLoading(false);
            }
          });
      } else {
        dispatch(logout());
        setLoading(false);
      }
    });
  }, [dispatch]);

  const appRoute = (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/user/:userId" exact component={User} />
        <Route path="/chat" exact component={Chats} />
        <Route path="/chat/:userId" exact component={Chat} />
      </Switch>
    </BrowserRouter>
  );

  return loading ? (
    <LoadingHome />
  ) : (
    <div className="App">{user ? appRoute : <Login />}</div>
  );
}

export default App;
