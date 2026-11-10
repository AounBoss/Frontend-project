import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ReusableModal from "./modal.jsx";
import Table from "./Table.jsx";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import API from "../api/axios.js";
// API base URL (adjust to your backend)
const API_URL = "http://localhost:4000/api/v1/categories";

function Categories() {
  // const userId = localStorage.getItem("user_id");
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",

    budget: "",
    // userId: userId || "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setEditingId(null);
    setFormData({
      name: "",
      budget: "",
      // userId: userId || "",
    });
    setError("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setFormData({
      name: "",
      budget: "",
      // userId: userId || "",
    });
  };
  const handleEdit = (category) => {
    setEditingId(category._id);
    setFormData({
      name: category.name || "",
      budget: category.budget ?? "",
      // userId: userId || "",
    });
    setError("");
    setOpen(true);
  };

  // READ: Fetch categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await API.get("/categories/get"
      //    {
      //   method: "GET",
      //   credentials: "include",
      // }
    );
      // if (!res.ok) throw new Error(`Error: ${res.status}`);
      // const data = await res.json();
      console.log("data", res.data);
      setCategories(res.data.categories||[]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // CREATE: Add new category
  // const handleCreate = async (e) => {
  //   e.preventDefault();
  //   const userId = window.localStorage.getItem("user_id");
  //   console.log("userId", userId);
  //   if (!userId) {
  //     setError("User is not logged in");
  //     return;
  //   }

  //   const data = {
  //     ...formData,
  //     userId: userId,
  //   };

  //   console.log("formData Values: ", formData);
  //   console.log("data Values: ", data);

  //   // Basic validation
  //   if (!formData.name) {
  //     setError("All fields are required.");
  //     return;
  //   }
  //   try {
  //     setError("");
  //     const res = await fetch(
  //       "http://localhost:4000/api/v1/categories/create",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           name: formData.name,

  //           budget: Number(formData.budget),
  //           userId: formData.userId,
  //         }),
  //       },
  //     );
  //     if (!res.ok) throw new Error(`Error: ${res.status}`);
  //     await fetchCategories(); // Refresh list
  //     setFormData({ name: "", budget: "", userId: userId });
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };
  const handleCreate = async (e) => {
    e.preventDefault();

    // if (!userId) {
    //   setError("User is not logged in");
    //   return;
    // }

    if (!formData.name.trim()) {
      setError("Category name is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const isEditing = Boolean(editingId);

      const url = isEditing
        ? `${"/categories/update"}/${editingId}`
        : `${"/categories/create"}`;

      // const res = await fetch(url, {
      //   method: isEditing ? "PUT" : "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     // "X-User-Id": userId,
      //   },credentials:"include",
      //   body: JSON.stringify({
      //     name: formData.name.trim(),
      //     budget: Number(formData.budget) || 0,
      //     // userId,
      //   }),
      // });
      // 
       const data = {
      name: formData.name.trim(),
      budget: Number(formData.budget) || 0,
    };

    let res;

    if (isEditing) {
      res = await API.put(url, data, 
      //   {
      //   withCredentials: true,
      // }
    );
    } else {
      res = await API.post(url, data,
      //    {
      //   withCredentials: true,
      // }
    );
    }

      // if (!res.ok) {
      //   throw new Error(
      //     `Failed to ${isEditing ? "update" : "create"} category: ${res.status}`,
      //   );
      // }

      await fetchCategories();

      setFormData({
        name: "",
        budget: "",
        // userId,
      });

      setEditingId(null);
      setOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // DELETE: Remove category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    try {
      const res = await API.delete(
        `${"/categories/delete"}/${id}`,
        // { method: "DELETE" },
      );
      // if (!res.ok) throw new Error(`Error: ${res.status}`);
      setCategories(categories.filter((cat) => cat._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };
  // const headerStyle = {
  //   width: "33.33%",
  //   padding: "13px 15px",
  //   border: "1px solid #f5f5f5",
  //   textAlign: "left",
  //   fontSize: "13px",
  //   fontWeight: "600",
  //   color: "grey",
  //   boxSizing: "border-box",
  // };

  // const cellStyle = {
  //   padding: "13px 15px",
  //   border: "1px solid #f5f5f5",
  //   textAlign: "left",
  //   fontSize: "13px",
  //   color: "#374151",
  //   boxSizing: "border-box",
  //   overflowWrap: "break-word",
  // };
  const columns = [
    {
      key: "name",
      label: "Name",
      render: (c) => c.name || "-",
    },
    {
      key: "budget",
      label: "Budget",
      cellStyle: { fontWeight: "600" },
      render: (c) => c.budget ?? "-",
    },
    {
      key: "actions",
      label: "Actions",
      cellStyle: { whiteSpace: "nowrap" },
      render: (c) => (
        <>
          <EditIcon
            onClick={() => handleEdit(c)}
            style={{
              cursor: "pointer",
              marginRight: "12px",
              fontSize: "18px",
              marginTop: "12px",
            }}
          />

          <DeleteIcon
            onClick={() => handleDelete(c._id)}
            style={{ cursor: "pointer", fontSize: "18px", marginBottom: "1px" }}
          />
        </>
      ),
    },
  ];

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "white",
        padding: "30px",
        width: "100%",
      }}
    >
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

          <Button variant="contained" onClick={handleOpen}>
            Add Category
          </Button>

          <ReusableModal
            open={open}
            handleClose={handleClose}
            title={editingId ? "Update Category" : "Add Category"}
          >
            {/* <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 400,
                      bgcolor: "background.paper",
                      border: "2px solid #000",
                      boxShadow: 24,
                      p: 4,
                      overflow: "auto",
                      maxHeight: "85%",
                    }}
                  > */}
            {/* <div
                      style={{
                        heigth: "20px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                      Add Category
                      </Typography>
                      {/* Button to Close the Modal Inside Content */}
            {/* <Button
                        variant="text"
                        color="error"
                        sx={{ m: 0, p: 0 }}
                        onClick={handleClose}
                      >
                        X
                      </Button>
                    </div> */}

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
              {/* <h3
            style={{
              // margin: "0 0 20px 0",
              color: "black",
              fontSize: "20px",
            }}
          >
            {loading ? "Edit Category" : "Add Category"}
          </h3> */}

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
                    {loading
                      ? editingId
                        ? "Updating..."
                        : "Adding..."
                      : editingId
                        ? "Update Category"
                        : "Add Category"}
                  </button>

                  {loading && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null);
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
          </ReusableModal>
        </div>
      </div>
      {/* <div style={{ overflowX: "auto", width: "100%" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            tableLayout: "fixed",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "white" }}>
              <th style={headerStyle}>Name</th>
              <th style={headerStyle}>Budget</th>
              <th style={headerStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.length > 0 ? (
              categories.map((c, index) => (
                <tr
                  key={c._id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f9fafb" : "#ffffff",
                  }}
                >
                  <td style={cellStyle}>{c.name || "-"}</td>

                  <td style={{ ...cellStyle, fontWeight: "600" }}>
                    {c.budget ?? "-"}
                  </td>

                  <td style={cellStyle}>
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
                <td colSpan={3} style={cellStyle}>
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div> */}{" "}
      <Table
        columns={columns}
        data={categories}
        getRowKey={(c) => c._id}
        emptyMessage="No categories found"
        tableLayout="fixed"
      />
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
export default Categories;
