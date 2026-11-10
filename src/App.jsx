import React, { useEffect, useState } from "react";
// import Register from "./Registration.jsx";
import { Navigate, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Transactions from "./Pages/Transactions1.jsx";
import Categories from "./Pages/Categories.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Sidebar from "./Pages/Sidebar.jsx";
// import "./api/refreshToken";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")==="true"
  );

  // const isUserLoggedIn = () => {
  //   const user = window.localStorage.getItem("user_id");
  //   if (user === null) return false;
  //   return true;
  // };

  // useEffect(() => {
  //   console.log(" is the user logged in? ", isUserLoggedIn());
  // }, []);

  return (
    <Routes>
      {" "}
      {!isLoggedIn ? (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <>
          {/* <Route path="/" element={<Transactions />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/*"
            element={<Navigate to="/transactions" replace />}
          /> */}
          <Route
            path="/"
            element={
              <div style={{ display: "flex" }}>
                <Sidebar setIsLoggedIn={setIsLoggedIn} />
                <div style={{ flex: 1 }}>
                  <Transactions />
                </div>
              </div>
            }
          />

          <Route
            path="/transactions"
            element={
              <div style={{ display: "flex" }}>
                <Sidebar setIsLoggedIn={setIsLoggedIn} />
                <div style={{ flex: 1 }}>
                  <Transactions />
                </div>
              </div>
            }
          />

          <Route
            path="/categories"
            element={
              <div style={{ display: "flex" }}>
                <Sidebar setIsLoggedIn={setIsLoggedIn} />
                <div style={{ flex: 1 }}>
                  <Categories />
                </div>
              </div>
            }
          />

          <Route
            path="/dashboard"
            element={
              <div style={{ display: "flex" }}>
                <Sidebar setIsLoggedIn={setIsLoggedIn} />
                <div style={{ flex: 1 }}>
                  <Dashboard />
                </div>
              </div>
            }
          />

          <Route path="*" element={<Navigate to="/transactions" replace />} />
        </>
      )}
    </Routes>
  );

  // return <Register />
}
export default App;
