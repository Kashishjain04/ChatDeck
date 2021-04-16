import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { login, logout, selectUser } from "./redux/userSlice";
import firebase from "./firebase";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "./pages/Profile";

const auth = firebase.auth,
  db = firebase.firestore;

function App() {
  const dispatch = useDispatch(),
    user = useSelector(selectUser);
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        db()
          .doc(`users/${user.email}`)
          .onSnapshot((snap) => {
            if (snap.exists) {
              dispatch(login(snap.data()));
            }
          });
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  const appRoute = (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profile" exact component={Profile} />
      </Switch>
    </BrowserRouter>
  );

  return <div className="App">{user ? appRoute : <Login />}</div>;
}

export default App;
