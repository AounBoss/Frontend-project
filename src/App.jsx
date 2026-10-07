import React from "react";
// import Register from "./Registration.jsx";
import { Link, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Transactions from "./Pages/Transactions.jsx";
import Categories from "./Pages/Categories.jsx";

import "./App.css";

function App() {
  return (
    <>
      {/* <nav>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/categories">Categories</Link>
      </nav> */}
      <div
        style={{
          height: "100vh",
        }}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </div>
    </>
  );

  // return <Register />
}
export default App;
