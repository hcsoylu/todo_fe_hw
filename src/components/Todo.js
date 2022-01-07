import React from "react";
import axios from "axios";
import { url } from "../url/url";
import { useNavigate } from "react-router-dom";
import CheckIcon from "../Icons/CheckIcon";
import NotDone from "../Icons/NotDone";
import EditIcon from "../Icons/EditIcon";
import DeleteIcon from "../Icons/DeleteIcon";

const Todo = ({ todo, getTodos }) => {
  const navigate = useNavigate();

  const deleteHandler = async (todoId) => {
    await axios.delete(`${url}/todos/mytodos/${todoId}`, {
      withCredentials: true,
    });

    getTodos();
  };

  return (
    <li>
      <div>
        <span>{todo.text}</span>
        <div className="icons_span">
          {todo.done ? <CheckIcon /> : <NotDone />}
          <span onClick={() => deleteHandler(todo._id)}>
            <DeleteIcon />
          </span>
          <span onClick={() => navigate(`/edit/${todo._id}`)}>
            <EditIcon />
          </span>
        </div>
      </div>
    </li>
  );
};

export default Todo;
