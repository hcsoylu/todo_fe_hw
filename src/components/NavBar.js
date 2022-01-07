import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/userContext";
import { url } from "../url/url";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const logoutHandler = () => {
    axios.post(
      `${url}/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    setUser(null);
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      {user && (
        <button className="btn" onClick={logoutHandler}>
          Log out
        </button>
      )}
    </nav>
  );
};

export default Navbar;
