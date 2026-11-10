import React, { useState } from "react";
import Balance from "./Balance.jsx";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,

  Drawer,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CategoryIcon from "@mui/icons-material/Category";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LogoutIcon from "@mui/icons-material/Logout";
import API from "../api/axios.js";

const drawerWidth = 240;

export default function Sidebar({ setIsLoggedIn = () => {} }) {
  const [open, setOpen] = useState(true);
  // const userId = window.localStorage.getItem("user_id");
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: "Transactions", icon: <ReceiptIcon />, path: "/transactions" },

    { text: "Budget", icon: <AttachMoneyIcon />, path: "/dashboard" },
    { text: "Categories", icon: <CategoryIcon />, path: "/categories" },
  ];
  const handleLogout = async () => {
    try {
      // 1. Call the logout API with the user ID
     const res = await API.post("/auth/logout",
    //    {
    // //     method: "POST",
        
    // //       credentials: "include",
            
        
    // //   }
    );
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      // 2. Clear local storage (or specific items)
      // window.localStorage.removeItem("user_id");
 localStorage.removeItem("isLoggedIn");
       setIsLoggedIn(false);
 
      navigate("/login", { replace: true });
    }
  };

  return (
    <Box>
      {/* Sidebar Drawer */}
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "purple",
            height: "100vh",
            justifyContent: "space-between",
          },
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo  */}
          <Typography sx={{ color: "white" }}>MoneyTrax</Typography>
          {/* Collapsible Menu Icon */}
          {/* <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton> */}
        </Toolbar>
        <Divider style={{ borderBottomColor: "white" }} />
        {/* Total Amount in Middle */}
        <Box
          sx={{
            display: "flex",
            textAlign: "center",
            marginLeft: "20px",
            // padding: "9px",
            justifyContent: "space-between",
          }}
        >
          {/* <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Total Amount
          </Typography> */}
          <Typography color="primary">
            <Balance />
          </Typography>
        </Box>
        <Divider style={{ borderBottomColor: "white" }} />
        {/* Menu Items */}
        <List
          sx={{
            margin: "0px",
            gap: "0px",
            display: "flex",
            flexDirection: "column",
            gap: "0px",
          }}
        >
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={Link} to={item.path}>
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    padding: "8px",
                    color: "white",
                    margin: "0px",
                    "& .MuiSvgIcon-root": { fontSize: 18 },
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    color: "white",
                    "& .MuiListItemText-primary": {
                      fontSize: "12px",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box
          sx={{
            textAlign: "center",
            marginLeft: "15px",
            py: 4,
            marginTop: "150px",
          }}
        >
          {" "}
          <div
            style={{ display: "flex", gap: "120px", padding: "8px" }}
            onClick={handleLogout}
          >
            <p style={{ fontSize: "12px", color: "white" }}>Logout</p>
            <LogoutIcon
              style={{ fontSize: "18", color: "white", marginTop: "3px" }}
            />
          </div>
        </Box>{" "}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          //   p: 3,
          transition: "margin 0.3s",
          //   marginLeft: open ? `${drawerWidth}px` : "0px"
        }}
      >
        <Toolbar />
        {/* <Typography variant="h4">Dashboard Content</Typography>
        <Typography>
          This is where your main content will appear when you select menu
          items.
        </Typography> */}
      </Box>
    </Box>
  );
}
