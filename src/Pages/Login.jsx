import { useState } from "react";
import {Snackbar,Alert}from "@mui/material"

const API_URL = "http://localhost:4000/api/v1/auth/login";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!/\S+@\S+\.\S+/.test(formData.email)) return "Invalid email format";
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (formData.password.length < 6)
      return "Password must be at least 6 characters";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError();
    setSuccess("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:4000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Login failed");
      }

      const data = await response.json();
      setSuccess(data.message || "Login successful!");
      // setFormData({ email: "", password: "" });
      window.localStorage.setItem("user_id", data.user.id);
      // window.localStorage.setItem("user_email: ", data.user.email);
      // window.localStorage.setItem("user_name: ", data.user.username);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {/* TITLE & SUBTITLE */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          padding: "12px",
          color: "black",
        }}
      >
        <h3
          style={{
            margin: 0,
          }}
        >
          Log in now
        </h3>
        <p>Log in to your account below</p>
      </div>{" "}
      
      <form onSubmit={handleSubmit}>
        {/* EMAIL FIELD */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <label
            style={{
              fontSize: "15px",
              color: "grey",
            }}
          >
            Email
          </label>
          <input
            style={{
              borderRadius: 6,
              backgroundColor: "transparent",
            }}
            id="email"
            name="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleChange}
          ></input>
        </div>
        {/* PASSWORD FIELD */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <label
            style={{
              fontSize: "15px",
              color: "grey",
            }}
          >
            Password
          </label>
          <input
            style={{
              borderRadius: 6,
              backgroundColor: "transparent",
            }}
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          ></input>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
          />
          Show Password
        </div>

        <button
          style={{
            backgroundColor: "lightgreen",
            borderRadius: "8px",
            width: "220px",
            height: "35px",
            boxShadow: "none",
            border: "none",
            marginTop: "38px",
          }}
          type="submit"
          disabled={loading}
        >
          {loading ? "Adding..." : "Login"}
        </button>
      </form><Snackbar
        open={success}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" variant="outlined" sx={{ width: "100%" }}>
          {success}
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="error" variant="outlined" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default LoginForm;
