import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../context/userContext";

import { url } from "../url/url";

const EditTodo = () => {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  let { id: paramsId } = useParams();

  const [editTodo, setEditTodo] = useState(null);

  const getOneTodo = async (id) => {
    const { data } = await axios.get(`${url}/todos/mytodos/${id}`);

    console.log(data.todo);

    setEditTodo(data.todo);
  };

  useEffect(() => {
    getOneTodo(paramsId);
  }, [paramsId]);

  const editHandler = async (id) => {
    const data = {
      userId: user._id,
      text: editTodo.text,
      done: editTodo.done,
    };

    await axios.patch(`${url}/todos/mytodos/${id}`, data, {
      withCredentials: true,
    });

    navigate("/");
  };

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Edit your todo</h3>

      <div className="edit_form">
        <input
          className="edit_todo_input"
          type="text"
          value={editTodo?.text}
          onChange={(e) =>
            setEditTodo((prev) => ({ ...prev, text: e.target.value }))
          }
        />
        <div>
          <label for="done">is Done ? </label>
          <input
            type="checkbox"
            id="done"
            checked={editTodo?.done}
            onChange={(e) =>
              setEditTodo((prev) => ({ ...prev, done: e.target.checked }))
            }
          />
        </div>

        <button onClick={() => editHandler(editTodo._id)} className="btn">
          Edit
        </button>
      </div>
    </div>
  );
};

export default EditTodo;
