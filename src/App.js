import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserContext from "./context/userContext";
import { useContext } from "react";

import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import EditTodo from "./pages/EditTodo";

function App() {
  const { user } = useContext(UserContext);

  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<EditTodo />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      </Routes>
    </div>
  );
}

export default App;
