import React, { useState, useEffect } from "react";

// API base URL (adjust to your backend)
const API_URL = "http://localhost:4000/api/v1categories";

function Categories() {
  const userId = localStorage.getItem("user_id");
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    budget: "",
    userId: userId || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // READ: Fetch categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/v1/categories/get",
        {
          headers: {
            "X-User-Id": userId,
          }
        });
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const data = await res.json();
      console.log("data", data);
      setCategories(data.categories);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // CREATE: Add new category
  const handleCreate = async (e) => {
    e.preventDefault();
    const userId = window.localStorage.getItem("user_id");
    console.log("userId", userId);
    if (!userId) {
      setError("User is not logged in");
      return;
    }

    const data = {
      ...formData,
      userId: userId,
    };

    console.log("formData Values: ", formData);
    console.log("data Values: ", data);

    // Basic validation
    if (!formData.name || !formData.type || !formData.budget) {
      setError("All fields are required.");
      return;
    }
    try {
      setError("");
      const res = await fetch(
        "http://localhost:4000/api/v1/categories/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            type: formData.type,
            budget: Number(formData.budget),
            userId: formData.userId,
          }),
        },
      );
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      await fetchCategories(); // Refresh list
      setFormData({ name: "", type: "", budget: "", userId: userId });
    } catch (err) {
      setError(err.message);
    }
  };

  // DELETE: Remove category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    try {
      const res = await fetch(
        `${"http://localhost:4000/api/v1/categories/delete"}/${id}`,
        { method: "DELETE" },
      );
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      setCategories(categories.filter((cat) => cat._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "white",
        padding: "30px",
      }}
    >
      {/* Error */}
      {error && (
        <div
          style={{
            backgroundColor: "white",
            color: "red",
            padding: "12px 15px",
            borderRadius: "6px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}
      <div
        style={{
          margin: "0 auto",
          display: "flex",
          gap: "40px",
        }}
      >
        <div
          style={{
            borderRadius: "8px",
            border: "1px solid white",
            flexDirection: "column",
            alignItems: "start",
            display: "flex",
            flex: 1.5,
          }}
        >
          <h3
            style={{
              // margin: "0 0 20px 0",
              color: "black",
              fontSize: "20px",
            }}
          >
            {loading ? "Edit Category" : "Add Category"}
          </h3>

          <form
            onSubmit={handleCreate}
            style={{
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <div style={{}}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "black",
                  }}
                >
                  Type
                </label>

                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "11px",
                    border: "1px solid grey",
                    borderRadius: "5px",
                    fontSize: "14px",
                    backgroundColor: "white",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="">Select Type</option>
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                </select>
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "black",
                  }}
                >
                  Name
                </label>

                <input
                  type="text"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "11px",
                    border: "1px solid grey",
                    borderRadius: "5px",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "black",
                  }}
                >
                  Budget
                </label>

                <input
                  type="number"
                  placeholder="Enter budget"
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      budget: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "11px",
                    border: "1px solid grey",
                    borderRadius: "5px",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                marginTop: "22px",
                display: "flex",
                flex: 2,
                gap: "10px",
                // marginleft: "1000px",
              }}
            >
              <button
                type="submit"
                style={{
                  padding: "20px 20px",
                  backgroundColor: "blue",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                {loading ? "Update Category" : "Add Category"}
              </button>

              {loading && (
                <button
                  type="button"
                  onClick={() => {
                    setLoading(null);
                    setFormData({
                      type: "",
                      userId: "",
                      name: "",
                      budget: "",
                    });
                  }}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "grey",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
        <div
          style={{
            borderRadius: "8px",
            border: "1px solid white",
            overflow: "hidden",
            display: "flex",
            flex: 3,
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <div
            style={{
              marginBottom: "14px",
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                color: "black",
              }}
            >
              Category History
            </h3>
          </div>
          <div style={{ overflowX: "auto", width: "100%" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "white",
                  }}
                >
                  <th
                    style={{
                      padding: "13px 15px",
                      borderBottom: "1px solid white",
                      textAlign: "left",
                      fontSize: "13px",
                      color: "black",
                    }}
                  >
                    Type
                  </th>
                  <th
                    style={{
                      padding: "13px 15px",
                      borderBottom: "1px solid grey",
                      textAlign: "left",
                      fontSize: "13px",
                      color: "black",
                    }}
                  >
                    Name
                  </th>

                  <th
                    style={{
                      padding: "13px 15px",
                      borderBottom: "1px solid grey",
                      textAlign: "left",
                      fontSize: "13px",
                      color: "grey",
                    }}
                  >
                    Budget
                  </th>

                  <th
                    style={{
                      padding: "13px 15px",
                      borderBottom: "1px solid grey",
                      textAlign: "left",
                      fontSize: "13px",
                      color: "black",
                    }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.length > 0 ? (
                  categories.map((c) => (
                    <tr key={c._id}>
                      <td
                        style={{
                          padding: "13px 15px",
                          borderBottom: "1px solid grey",
                        }}
                      >
                        <span
                          style={{
                            padding: "4px 9px",
                            borderRadius: "4px",
                            backgroundColor:
                              c.type === "Income" ? "white" : "white",
                            color: c.type === "Income" ? "green" : "red",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        >
                          {c.type}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "13px 15px",
                          borderBottom: "1px solid grey",
                        }}
                      >
                        {c.name || "-"}
                      </td>
                      <td
                        style={{
                          padding: "13px 15px",
                          borderBottom: "1px solid white",
                          fontWeight: "600",
                        }}
                      >
                        {c.budget}
                      </td>
                      <td
                        style={{
                          padding: "13px 15px",
                          borderBottom: "1px solid grey",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <button
                          onClick={() => handleDelete(c._id)}
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "red",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      style={{
                        padding: "30px",
                        textAlign: "center",
                        color: "black",
                      }}
                    ></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Categories;
