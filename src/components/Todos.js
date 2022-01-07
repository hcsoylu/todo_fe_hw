import axios from "axios";
import React, { useContext, useState } from "react";
import UserContext from "../context/userContext";
import { url } from "../url/url";
import Todo from "./Todo";

const Todos = ({ todos, setTodos, getTodos }) => {
  const { user } = useContext(UserContext);

  const [inputVal, setInputVal] = useState("");

  const addTodo = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      `${url}/todos/mytodos`,
      { text: inputVal, userId: user._id },
      {
        withCredentials: true,
      }
    );

    setTodos((prev) => [...prev, data.savedTodo]);
    setInputVal("");
  };

  return (
    <div>
      <form onSubmit={addTodo} className="todo_form">
        <input
          type="text"
          placeholder="add todo"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
      </form>
      {todos.length === 0 ? (
        <div style={{ textAlign: "center" }}>
          You dont have any todos yet! Start adding todos!
        </div>
      ) : (
        <ul>
          {todos.map((todo) => (
            <Todo key={todo._id} todo={todo} getTodos={getTodos} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Todos;
