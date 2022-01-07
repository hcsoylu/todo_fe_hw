import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Todos from "../components/Todos";
import UserContext from "../context/userContext";
import { url } from "../url/url";

const Home = () => {
  const { user } = useContext(UserContext);

  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const { data } = await axios.get(`${url}/todos/mytodos`, {
        withCredentials: true,
      });

      setTodos(data.todos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getTodos();
    }
  }, [user]);

  return (
    <div>
      {!user && (
        <div className="welcome">
          Welcome click <Link to="/login">here</Link> to Login and start adding
          todos!
        </div>
      )}
      {user && <Todos todos={todos} setTodos={setTodos} getTodos={getTodos} />}
    </div>
  );
};

export default Home;
