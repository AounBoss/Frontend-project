import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:4000/api/v1/transactions";
const CATEGORY_URL = "http://localhost:4000/api/v1/categories";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
<<<<<<< HEAD
  const [categories, setCategories] = useState([]);
=======
   const [categories, setCategories] = useState([]);
>>>>>>> 7ce74a08c22408627342e78c207f7e9a80ff71b3

  const [formData, setFormData] = useState({
    type: "",
    category: "",
    userId: localStorage.getItem("userId") || "",
    date: "",
    description: "",
    amount: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const fetchCategories = async () => {
<<<<<<< HEAD
    try {
      const res = await axios.get(
        `${"http://localhost:4000/api/v1/categories/get"}`,
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
    const userId = window.localStorage.getItem("user_id")
    
    try {
      const res = await axios.get(
        `${"http://localhost:4000/api/v1/transactions/get"}`,
        {
          headers: {
            "X-User-Id": userId,
          },
        },
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
      const res = await axios.get(
        `${"http://localhost:4000/api/v1/transactions/get"}/${id}`,
      );
=======
    try {
      const res = await axios.get(`${"http://localhost:4000/api/v1/categories/get"}`);

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
      const res = await axios.get(`${ "http://localhost:4000/api/v1/transactions/get"}`);

      console.log("API response:", res.data);

      setTransactions(res.data.transactions);
    } catch (err) {
      console.error("Fetch transactions error:", err);
      setError("Failed to fetch transactions");
    }
  };

  // GET transaction by ID
  const fetchTransactionById = async (id) => {
    try {
      const res = await axios.get(`${ "http://localhost:4000/api/v1/transactions/get"}/${id}`);
>>>>>>> 7ce74a08c22408627342e78c207f7e9a80ff71b3

      const transaction = res.data.transaction;

      setFormData({
        type: transaction.type,
        category: transaction.category,
        userId: transaction.userId?._id || localStorage.getItem("userId"),
        date: transaction.date,
        description: transaction.description,
<<<<<<< HEAD
        amount: transaction.amount,
=======
        amount: transaction.amount
>>>>>>> 7ce74a08c22408627342e78c207f7e9a80ff71b3
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
<<<<<<< HEAD
    const userId = window.localStorage.getItem("user_id");
=======
    const userId = localStorage.getItem("userId");

>>>>>>> 7ce74a08c22408627342e78c207f7e9a80ff71b3
    if (!userId) {
      setError("User is not logged in");
      return;
    }

    const data = {
      ...formData,
<<<<<<< HEAD
      userId: userId,
    };

    console.log("formData Values: ", formData);
    console.log("data Values: ", data);

=======
      userId: userId
    };

>>>>>>> 7ce74a08c22408627342e78c207f7e9a80ff71b3
    if (!data.type || !data.date || !data.amount) {
      setError("Please fill all required fields");
      return;
    }

    try {
      if (editingId) {
        await axios.put(
<<<<<<< HEAD
          `${"http://localhost:4000/api/v1/transactions/update"}/${editingId}`,

          data,
        );
      } else {
        await axios.post(
          `${"http://localhost:4000/api/v1/transactions/create"}`,
          data,
        );
      }

      // Reset form
      setFormData({
        type: "",
        category: "",
        userId: userId,
        date: "",
        description: "",
        amount: "",
      });

      setEditingId(null);

      await fetchTransactions();
=======
          `${ "http://localhost:4000/api/v1/transactions/update"}/${editingId}`,
          
          data
        );
      } else {
        await axios.post(
          `${ "http://localhost:4000/api/v1/transactions/create"}`,
          data
        );
      }

      // Reset form
      setFormData({
        type: "",
        category: "",
        userId: userId,
        date: "",
        description: "",
        amount: ""
      });

      setEditingId(null);

      await fetchTransactions();

>>>>>>> 7ce74a08c22408627342e78c207f7e9a80ff71b3
    } catch (err) {
      console.error("Save transaction error:", err);
      console.error("Backend response:", err.response?.data);

<<<<<<< HEAD
      setError(err.response?.data?.message || "Failed to save transaction");
=======
      setError(
        err.response?.data?.message || "Failed to save transaction"
      );
>>>>>>> 7ce74a08c22408627342e78c207f7e9a80ff71b3
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
<<<<<<< HEAD
      await axios.delete(
        `${"http://localhost:4000/api/v1/transactions/delete"}/${id}`,
      );
=======
      await axios.delete(`${ "http://localhost:4000/api/v1/transactions/delete"}/${id}`);
>>>>>>> 7ce74a08c22408627342e78c207f7e9a80ff71b3

      await fetchTransactions();
    } catch (err) {
      console.error(err);
      setError("Failed to delete transaction");
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, []);

<<<<<<< HEAD
  return (
=======
  

  
    // <div style={{ padding: "20px" }}>
    //   <h2>Transactions</h2>
    //   {error && <p style={{ color: "red" }}>{error}</p>}

    //   {/* Form */}
    //   <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
    //     <input
    //       type="text"
    //       placeholder="Type"
    //       value={formData.type}
    //       onChange={(e) => setFormData({ ...formData, type: e.target.value })}
    //     />
    //     <input
    //       type="text"
    //       placeholder="Category"
    //       value={formData.category}
    //       onChange={(e) => setFormData({ ...formData, category: e.target.value })}
    //     />
    //     <input
    //       type="text"
    //       placeholder="User ID"
    //       value={formData.userId}
    //       onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
    //     />
    //     <input
    //       type="date"
    //       value={formData.date}
    //       onChange={(e) => setFormData({ ...formData, date: e.target.value })}
    //     />
    //     <input
    //       type="text"
    //       placeholder="Description"
    //       value={formData.description}
    //       onChange={(e) => setFormData({ ...formData, description: e.target.value })}
    //     />
    //     <input
    //       type="number"
    //       placeholder="Amount"
    //       value={formData.amount}
    //       onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
    //     />
    //     <button type="submit">{editingId ? "Update" : "Add"} Transaction</button>
    //   </form>

    //   Transactions Table
    //   <table border="1" cellPadding="5">
    //     <thead>
    //       <tr>
    //         <th>Type</th>
    //         <th>Category</th>
    //         <th>User ID</th>
    //         <th>Date</th>
    //         <th>Description</th>
    //         <th>Amount</th>
    //         <th>Actions</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {transactions.map((t) => (
    //         <tr key={t._id}>
    //           <td>{t.type}</td>
    //           <td>{t.category}</td>
    //           <td>{t.userId}</td>
    //           <td>{t.date}</td>
    //           <td>{t.description}</td>
    //           <td>{t.amount}</td>
    //           <td>
    //             <button onClick={() => fetchTransactionById(t._id)}>Edit</button>
    //             <button onClick={() => handleDelete(t._id)}>Delete</button>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
    return (
  <div
    style={{
      minHeight: "100vh",
      backgroundColor: "white",
      padding: "30px",
      
    }}
  >
>>>>>>> 7ce74a08c22408627342e78c207f7e9a80ff71b3
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
            {editingId ? "Edit Transaction" : "Add Transaction"}
          </h3>

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

<<<<<<< HEAD
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
                {/* 
              <input
=======
              {/* <input
>>>>>>> 7ce74a08c22408627342e78c207f7e9a80ff71b3
                type="text"
                placeholder="Enter category ID"
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
<<<<<<< HEAD
              /> */}
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value,
                    })
                  }
=======
              /> */} <select
        value={formData.category}
        onChange={(e) =>
          setFormData({
            ...formData,
            category: e.target.value
          })
        } style={{
                  width: "80%",
                  padding: "11px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                  fontSize: "14px",
                  boxSizing: "border-box",}}
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
                User ID
              </label>

              <input
                type="text"
                placeholder="Enter user ID"
                value={formData.userId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    userId: e.target.value,
                  })
                }
                style={{
                  width: "80%",
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
                  width: "80%",
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
                  width: "80%",
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
                  width: "80%",
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
              gap: "10px",
              marginleft :"1000px"
          
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
              }}
            >
              {editingId ? "Update Transaction" : "Add Transaction"}
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

      {/* Transaction Table */}
      <div
        style={{
          
          borderRadius: "8px",
          border: "1px solid white",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "20px 25px",
            borderBottom: "1px solid grey",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "20px",
              color: "black",
            }}
          >
            Transaction History
          </h3>
        </div>

        <div style={{ overflowX: "auto" }}>
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
>>>>>>> 7ce74a08c22408627342e78c207f7e9a80ff71b3
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
                {editingId ? "Update Transaction" : "Add Transaction"}
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
            <button
              style={{
                backgroundColor: "blue",
                color: "white",
                border: "none",
                borderRadius: "5px",
                fontSize: "10px",
                fontWeight: "600",
                cursor: "pointer",
                height: "50%",
              }}
            >
              Add Category
            </button>
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
                      color: "grey",
                    }}
                  >
                    Category
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
                    Date
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
                    Description
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
                    Amount
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
                {transactions.length > 0 ? (
                  transactions.map((t) => (
                    <tr key={t._id}>
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
                              t.type === "Income" ? "white" : "white",
                            color: t.type === "Income" ? "green" : "red",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        >
                          {t.type}
                        </span>
                      </td>

                      <td
                        style={{
                          padding: "13px 15px",
                          borderBottom: "1px solid grey",
                        }}
                      >
                        {t.category?.name || "-"}
                      </td>

                      <td
                        style={{
                          padding: "13px 15px",
                          borderBottom: "1px solid grey",
                        }}
                      >
                        {t.date ? new Date(t.date).toLocaleDateString() : "-"}
                      </td>

                      <td
                        style={{
                          padding: "13px 15px",
                          borderBottom: "1px solid grey",
                        }}
                      >
                        {t.description || "-"}
                      </td>

                      <td
                        style={{
                          padding: "13px 15px",
                          borderBottom: "1px solid white",
                          fontWeight: "600",
                        }}
                      >
                        {t.amount}
                      </td>

                      <td
                        style={{
                          padding: "13px 15px",
                          borderBottom: "1px solid grey",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <button
                          onClick={() => fetchTransactionById(t._id)}
                          style={{
                            padding: "6px 12px",
                            marginRight: "6px",
                            backgroundColor: "blue",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(t._id)}
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
export default Transactions;
