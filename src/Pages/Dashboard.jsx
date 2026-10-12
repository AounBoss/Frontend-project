import { useEffect, useState, useCallback } from "react";
import axios from "axios";

function Dashboard() {
  const userId = localStorage.getItem("user_id");

  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  const fetchStats = async () => {
    if (!userId) return;

    try {
      const res = await axios.get(
        "http://localhost:4000/api/v1/dashboard/get",
        {
          headers: {
            "X-User-Id": userId,
          },
        },
      );

      setStats(res.data.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchStats();

    const interval = setInterval(() => {
      fetchStats();
    }, 5000);

    return () => clearInterval(interval); // Cleanup
  }, []);

  const cardStyle = {
    padding: "20px",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 2px 8px #ddd",
    flex: "1",
  };

  return (
    <div style={{ padding: "20px", background: "#f4f6f9" }}>
      {/* Header */}
      <h2 style={{ marginBottom: "20px" }}>Dashboard</h2>

      {/* Cards */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div style={{ ...cardStyle, borderTop: "4px solid green" }}>
          <h3>Total Income</h3>
          <h2>{stats.totalIncome.toLocaleString()}</h2>
        </div>

        <div style={{ ...cardStyle, borderTop: "4px solid red" }}>
          <h3>Total Expense</h3>
          <h2>{stats.totalExpense.toLocaleString()}</h2>
        </div>

        <div style={{ ...cardStyle, borderTop: "4px solid blue" }}>
          <h3>Balance</h3>
          <h2>{stats.balance.toLocaleString()}</h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
