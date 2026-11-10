import { useEffect, useState, useCallback } from "react";
import API from "../api/axios";

function Balance() {
  // const userId = localStorage.getItem("user_id");

  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  const fetchStats = async () => {
    // if (!userId) return;

    try {
      const res = await API.get(
        "/dashboard/get",
        // {
        //  withCredentials:"true"
        // },
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

//   const cardStyle = {
//     padding: "20px",
//     background: "white",
//     borderRadius: "10px",
//     boxShadow: "0 2px 8px #ddd",
//     flex: "1",
//   };

  return (
    <div style={{display:"flex",}}>
      {/* Header
     <h2 style={{ marginBottom: "20px" }}>Dashboard</h2> */}

      {/* Cards */}
      {/* <div  style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div className="card" style={{ ...cardStyle, borderTop: "4px solid blue",backgroundColor:"blue"}}>
          <h3 style={{color:"white"}}>Total Income</h3>
          <h2 style={{color:"white"}}>{stats.totalIncome.toLocaleString()}</h2>
        </div>

        <div className="card" style={{ ...cardStyle, borderTop: "4px solid blue" ,backgroundColor:"blue"}}>
          <h3 style={{color:"white"}}>Total Expense</h3>
          <h2 style={{color:"white"}}>{stats.totalExpense.toLocaleString()}</h2>
        </div> */}

        <div style={{}}>
          <p style={{color:"white",fontSize:"12px"}}>Account Balance</p>
          <h4 style={{color:"white",marginTop:"5px",display:"flex",}}>{stats.balance.toLocaleString()}</h4>
        </div>
       </div>
    // </div>
  );
}

export default Balance;
