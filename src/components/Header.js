import React from "react";
import { useAuth } from "../auth/AuthProvider";
import ThemeSwitcher from "./ThemeSwitcher";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    try {
      logout(() => navigate("/login"));
    } catch (e) {
      console.log("error when logout", e);
    }
  };

  if (!isAuthenticated) return;
  return (
    <div className="header-container">
      <div className=" header  header-flex ">
        <div>
          <h1 style={{ margin: "0px" }}>User Managment web</h1>
        </div>
        <div className="flex-right header-action-container ">
          <ThemeSwitcher />
          <Button
            variant="outlined"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
