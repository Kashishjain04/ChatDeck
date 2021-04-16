import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../redux/userSlice";

const Nav = () => {
  const user = useSelector(selectUser);
  return (
    <div className="bg-white sticky top-0 h-14 py-2 px-4 border-b-2">
      <div className="sm:max-w-2xl mx-auto flex items-center justify-between overflow-hidden">
        <div>
          <Link to="/" className="brand">
            ChatDeck
          </Link>
        </div>
        <div>
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
