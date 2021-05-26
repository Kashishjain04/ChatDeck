import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../redux/userSlice";
import firebase from "../firebase";
import OutsideAlerter from "../hooks/OutsideAlerter";

const db = firebase.firestore;

const Nav = () => {
  const user = useSelector(selectUser),
    [allUsers, setAllUsers] = useState([]),
    [searchRes, setSearchRes] = useState([]),
    [searchShow, setSearchShow] = useState(false);

  useEffect(() => {
    db()
      .collection("users")
      .onSnapshot((snap) => {
        setAllUsers(snap.docs.map((doc) => doc.data()));
      });
    return () => {
      setAllUsers([]);
      setSearchRes([]);
      setSearchShow(false);
    };
  }, []);

  const onSearchChange = (e) => {
    setSearchShow(true);
    const search = e.target.value.toLowerCase();
    setSearchRes(
      allUsers.filter(
        (usr) =>
          usr.email !== user.email &&
          (usr.name.toLowerCase().includes(search) ||
            usr.email.toLowerCase().includes(search))
      )
    );
  };

  const SearchCard = ({ searchUser }) => (
    <Link
      to={`user/${searchUser?.email}`}
      className="flex items-center space-x-3 p-2 cursor-pointer hover:bg-gray-100"
    >
      <img
        className="h-10 w-10 rounded-full"
        src={searchUser.photoURL}
        alt="profile"
      />
      <div className="flex flex-col">
        <h1>{searchUser.name}</h1>
        <p className="text-xs text-gray-500">{searchUser.email}</p>
      </div>
    </Link>
  );

  const NoResult = () => (
    <div className="text-center text-gray-500 p-2">No Results</div>
  );

  return (
    <div className="bg-white sticky top-0 h-14 py-2 px-4 border-b-2 z-10">
      <div className="sm:max-w-2xl mx-auto flex items-center justify-between">
        <div>
          <Link to="/" className="brand">
            ChatDeck
          </Link>
        </div>
        <OutsideAlerter onClickAway={() => setSearchShow(false)}>
          <div>
            <input
              onFocus={() => setSearchShow(true)}
              className="search-input"
              type="text"
              placeholder="Search"
              onChange={onSearchChange}
            />
            {searchShow && (
              <div className="bg-transparent absolute left-0 w-screen z-30">
                <div className="max-h-72 overflow-y-scroll shadow-xl border rounded-lg bg-white mx-auto mt-1 max-w-xs py-2">
                  <div>
                    {searchRes.length === 0 ? (
                      <NoResult />
                    ) : (
                      searchRes.map((res, index) => (
                        <SearchCard key={index} searchUser={res} />
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </OutsideAlerter>
        <div className="flex items-center space-x-3">
          <Link to="/chat">
            <i className="bx bx-comment text-2xl w-9 h-9 rounded-full text-center p-1 hover:bg-gray-200" />
          </Link>
          <div className="bg-black p-0.5 w-9 h-9 rounded-full">
            <div className="bg-white p-0.5 rounded-full">
              <Link to="/profile">
                <img
                  className=" rounded-full"
                  src={user.photoURL}
                  alt="profile"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
