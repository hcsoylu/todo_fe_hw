import React, { useContext, useState } from "react";
import axios from "axios";
import UserContext from "../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../url/url";

const Login = () => {
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();

    const userData = { email, password };

    try {
      const { data } = await axios.post(`${url}/auth/login`, userData, {
        withCredentials: true,
      });

      if (data.user) {
        setUser(data.user);
        navigate("/");
      }

      if (data.msg) {
        setError(data.msg);
      } else {
        setError("something went wrong please try again!");
      }
    } catch (error) {
      console.log(error);
      setError("something went wrong!");
    }
  };

  return (
    <form onSubmit={loginHandler} className="auth">
      <h3>LOGIN PAGE</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="submit" className="btn">
        Log in
      </button>
      <p>
        Don't you have an account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
};

export default Login;
