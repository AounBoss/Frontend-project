import Dashboard from "./Dashboard.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ReusableModal from "./modal.jsx";
import Table from "./Table.jsx";
import API from "../api/axios";

const API_URL = "http://localhost:4000/api/v1/transactions";
const CATEGORY_URL = "http://localhost:4000/api/v1/categories";

function Transactions() {
  // const userId = window.localStorage.getItem("user_id");
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const handleOpen = (type = "add") => {
    setMode(type);
    if (type === "add") {
      setEditingId(null);
      setFormData({
        type: "",
        category: "",
        // userId: userId || "",
        date: "",
        description: "",
        amount: "",
      });
    }
    // koi variable banao gey jo ke add ya edit mode mein khole ga aap ka omdal
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState({
    type: "",
    category: "",
    // userId: localStorage.getItem("userId") || "",
    date: "",
    description: "",
    amount: "",
  });
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const fetchCategories = async () => {
    try {
      const res = await API.get(
        "/categories/get"
        
          // headers: {
          //   "X-User-Id": userId,
          // },
        
        
      );

      console.log("Categories:", res.data);

      setCategories(res.data.categories);
    } catch (err) {
      console.error("Category error:", err);
      setError("Failed to fetch categories");
    }
  };

  // GET all transactions
  const fetchTransactions = async () => {
    try {
      const res = await API.get(
        "/transactions/get"

        
          
        
      );

      console.log("API response:", res.data);

      setTransactions(res.data.transactions);
    } catch (err) {
      console.error("Fetch transactions error:", err);
      setError("Failed to fetch transactions");
    }
  };
  const fetchTransactionById = async (id) => {
    try {
      const res = await API.get(
        `${"/transactions/get"}/${id}`,
      );

      const transaction = res.data.transaction;

      setFormData({
        type: transaction.type,
        category:
          typeof transaction.category === "object"
            ? transaction.category._id || ""
            : transaction.category || "",
        // userId: transaction.userId?._id || localStorage.getItem("userId"),
        date: transaction.date ? String(transaction.date).slice(0, 10) : "",
        description: transaction.description,
        amount: transaction.amount,
      });

      setEditingId(id);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch transaction by ID");
    }
  };

  // CREATE / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Get user ID from localStorage
    // const userId = window.localStorage.getItem("user_id");
    // if (!userId) {
    //   setError("User is not logged in");
    //   return;
    // }

    const data = {
      ...formData,
      // userId: userId,
    };

    console.log("formData Values: ", formData);
    console.log("data Values: ", data);

    if (!data.type || !data.date || !data.amount) {
      setError("Please fill all required fields");
      return;
    }

    try {
      if (editingId) {
        await API.put(
          `${"/transactions/update"}/${editingId}`,

          data,
        );
      } else {
        await API.post(
          `${"/transactions/create"}`,
          data,
        );
      }

      // Reset form
      setFormData({
        type: "",
        category: "",
        // userId: userId,
        date: "",
        description: "",
        amount: "",
      });

      setEditingId(null);
      setOpen(false);

      await fetchTransactions();
    } catch (err) {
      console.error("Save transaction error:", err);
      console.error("Backend response:", err.response?.data);

      setError(err.response?.data?.message || "Failed to save transaction");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await API.delete(
        `${"/transactions/delete"}/${id}`,
      );

      await fetchTransactions();
    } catch (err) {
      console.error(err);
      setError("Failed to delete transaction");
    }
  };
  // const navigate = useNavigate();

  // const handleLogout = async () => {
  //   try {
  //     // 1. Call the logout API with the user ID
  //     await fetch("/api/logout", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ userId }),
  //     });

  //     // 2. Clear local storage (or specific items)
  //     localStorage.clear();

  //     // 3. Redirect to login page
  //     navigate("/login");
  //   } catch (error) {
  //     console.error("Logout failed:", error);
  //   }};
  // };const cellStyle = {
  // padding: "14px 16px",
  // textAlign: "left",
  // fontSize: "12px",
  // color: "#374151",
  // borderBottom: "1px solid #e5e7eb",
  // verticalAlign: "middle",
  const columns = [
    {
      key: "type",
      label: "Type",
      render: (t) => (
        <span
          style={{
            color: t.type === "Income" ? "green" : "red",
            fontWeight: "600",
          }}
        >
          {t.type}
        </span>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (t) => t.category?.name || "-",
    },
    {
      key: "date",
      label: "Date",
      cellStyle: { whiteSpace: "nowrap" },
      render: (t) =>
        t.date ? new Date(t.date).toLocaleDateString("en-GB") : "-",
    },
    {
      key: "description",
      label: "Description",
    },
    {
      key: "amount",
      label: "Amount",
      cellStyle: {
        fontWeight: "600",
        whiteSpace: "nowrap",
      },
    },
    {
      key: "actions",
      label: "Actions",
      cellStyle: { whiteSpace: "nowrap" },
      render: (t) => (
        <>
          <EditIcon
            onClick={() => {
              handleOpen("edit");
              fetchTransactionById(t._id);
            }}
            style={{
              cursor: "pointer",
              marginRight: "12px",
              fontSize: "18px",
              marginTop: "12px",
            }}
          />

          <DeleteIcon
            onClick={() => handleDelete(t._id)}
            style={{ cursor: "pointer", fontSize: "18px", marginBottom: "1px" }}
          />
        </>
      ),
    },
  ];

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, []);

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      {/* <Dashboard /> */}
      <div
        className="Card1"
        style={{
          minHeight: "100vh",
          backgroundColor: "white",
          padding: "30px",
        }}
      >
        {/* Transaction Table */}
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
              Transaction History
            </h3>

            <div>
              {/* Button to Open the Modal */}
              <Button
                variant="contained"
                onClick={() => {
                  handleOpen("add");
                }}
              >
                Add Transaction
              </Button>

              <ReusableModal
                open={open}
                handleClose={handleClose}
                title={mode === "edit" ? "Edit Transaction" : "Add Transaction"}
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
                  > */}
                {/* <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                      sx={{
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      {mode === "edit" ? "Edit Transaction" : "Add Transaction"}
                    </Typography> */}
                {/* Button to Close the Modal Inside Content */}
                {/* <Button
                      variant="text"
                      color="error"
                      sx={{ }}
                      onClick={handleClose}
                      
                    >
                      X
                    </Button> */}
                {/* </div> */}

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
                  <form
                    onSubmit={handleSubmit}
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
                          Category
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              category: e.target.value,
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
                        >
                          <option value="">Select Category</option>

                          {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                              {category.name}
                            </option>
                          ))}
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
                          Date
                        </label>

                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              date: e.target.value,
                            })
                          }
                          style={{
                            width: "100%",
                            padding: "10px",
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
                          Description
                        </label>

                        <input
                          type="text"
                          placeholder="Enter description"
                          value={formData.description}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              description: e.target.value,
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
                          Amount
                        </label>

                        <input
                          type="number"
                          placeholder="Enter amount"
                          value={formData.amount}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              amount: e.target.value,
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
                        {mode === "edit"
                          ? "Update Transaction"
                          : "Add Transaction"}
                      </button>

                      {editingId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(null);
                            setFormData({
                              type: "",
                              category: "",
                              userId: "",
                              date: "",
                              description: "",
                              amount: "",
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
      border: "1px solid #e5e7eb",
      tableLayout: "auto",
    }}
  >
    <thead>
      <tr style={{ backgroundColor: "#ffffff" }}>
        {[
          "Type",
          "Category",
          "Date",
          "Description",
          "Amount",
          "Actions",
        ].map((heading) => (
          <th
            key={heading}
            style={{
              padding: "14px 16px",
              textAlign: "left",
              fontSize: "12px",
              fontWeight: "600",
              color: "#6b7280",
              borderBottom: "1px solid #e5e7eb",
              whiteSpace: "nowrap",
            }}
          >
            {heading}
          </th>
        ))}
      </tr>
    </thead>

    <tbody>
      {sortedTransactions.length > 0 ? (
        sortedTransactions.map((t, index) => (
          <tr
            key={t._id}
            style={{
              backgroundColor:
                index % 2 === 0 ? "#f9fafb" : "#ffffff",
            }}
          >
            <td style={cellStyle}>
              <span
                style={{
                  color: t.type === "Income" ? "green" : "red",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                {t.type}
              </span>
            </td>

            <td style={cellStyle}>
              {t.category?.name || "-"}
            </td>

            <td style={{ ...cellStyle, whiteSpace: "nowrap" }}>
              {t.date
                ? new Date(t.date).toLocaleDateString("en-GB")
                : "-"}
            </td>

            <td style={cellStyle}>
              {t.description || "-"}
            </td>

            <td
              style={{
                ...cellStyle,
                fontWeight: "600",
                whiteSpace: "nowrap",
              }}
            >
              {t.amount}
            </td>

            <td
              style={{
                ...cellStyle,
                whiteSpace: "nowrap",
              }}
            >
              <EditIcon
                onClick={() => {
                  handleOpen("edit");
                  fetchTransactionById(t._id);
                }}
                style={{
                  marginRight: "12px",
                  cursor: "pointer",
                  fontSize: "18px",
                  verticalAlign: "middle",
                }}
              />

              <DeleteIcon
                onClick={() => handleDelete(t._id)}
                style={{
                  cursor: "pointer",
                  fontSize: "18px",
                  verticalAlign: "middle",
                }}
              />
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={6}
            style={{
              padding: "30px",
              textAlign: "center",
              color: "#6b7280",
            }}
          >
            No transactions found
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div> */}
          <Table
            columns={columns}
            data={sortedTransactions}
            getRowKey={(t) => t._id}
            emptyMessage="No transactions found"
          />
        </div>
      </div>{" "}
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
export default Transactions;
