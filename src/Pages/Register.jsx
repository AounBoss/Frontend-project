import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const API_URL = "http://localhost:4000/api/v1/auth/register";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: "",
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
    if (!formData.username.trim()) return "Name is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) return "Invalid email format";
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
      const response = await fetch(
        "http://localhost:4000/api/v1/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Registration failed");
      }

      const data = await response.json();
      setSuccess(data.message || "Registration successful!");
      // setFormData({ username: "", email: "", password: "" });
      // now redirect the user to the login page
      window.location.assign('/login')
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
          Sign up now
        </h3>
        <p>Create your account below</p>
      </div>
      <form onSubmit={handleSubmit}>
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
            UserName
          </label>
          <input
            style={{
              borderRadius: 6,
              backgroundColor: "transparent",
            }}
            id="username"
            name="username"
            type="text"
            placeholder="Enter your name"
            value={formData.username}
            onChange={handleChange}
          ></input>
        </div>
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
          {loading ? "Adding..." : "Register"}
        </button>
      </form>
      <Snackbar
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

export default RegistrationForm;
