import { useState} from "react";
import "./App.css"
const API_URL ="http://localhost:4000/api/v1/auth";
function Register() {
  
  const [form, setForm] = useState({
    username: "",
    password:"",
    email:"",
  });

  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  
   const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.username|| !form.password || !form.email) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      console.log("Form DATA", form);

      const response = await fetch(
        "http://localhost:4000/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );
      const newTask = await response.json();
      console.log("Backend response:", newTask);
      console.log("Status:", response.status);

      if (!response.ok) {
        throw new Error("Unable to register.");
      }

      setTasks((previous) => [...previous, newTask.task]);

      setForm({
        username: "",
        password: "",
        email: "",
      });
    } catch (err) {
      setError(err.message || "Unable to register.");
    } finally {
      setSubmitting(false);
    }
  };return(
  <div className="app">
      <div className="container">
        <section className="style">
            <h1>Registration</h1>
          

          {error && (
            <div className="error">
              <span>⚠️ {error}</span>

              <button onClick={() => setError("")}>×</button>
            </div>
          )}

          <section className="form-card">
            <h2 className="style5">Add Cerendtials</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username"> Username <span>*</span>
                </label>
                 <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your name"
                  value={form.username}
                  onChange={handleChange}
                /> 
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  Email <span>*</span>
                </label>
                 <input
                  id="email"
                  name="email"
                  placeholder="Enter your Email"
                  value={form.email}
                  onChange={handleChange}
                  
                /> </div>
                <div className="form-group">
                <label htmlFor="password">
                   Password<span>*</span>
                </label>{" "}
                 <input
                  id="password"
                  name="password"
                  type="text"
                  value={form.password}
                  onChange={handleChange}
                /> </div>
                  <button
                className="add-button"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Adding..." : "+ Submit"}
               </button>  
            </form>
          </section>
        </section></div>
        </div>

                );
}
  export default Register;

