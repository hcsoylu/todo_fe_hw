import React, { useContext, useState } from "react";
import axios from "axios";
import UserContext from "../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../url/url";

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = { email, password };

    try {
      const { data } = await axios.post(`${url}/auth/register`, userData, {
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
    }
  };

  return (
    <form onSubmit={submitHandler} className="auth">
      <h3>REGISTER PAGE</h3>
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
      <button className="btn" type="submit">
        Register
      </button>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
};

export default Register;
