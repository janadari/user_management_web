import React from "react";
import { useAuth } from "../auth/AuthProvider";
import ThemeSwitcher from "./ThemeSwitcher";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
    <div className=" flex-1">
      <div className="flex-right flex-1">
        <Link to="/" onClick={handleLogout}>
          <button>Logout</button>
        </Link>
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Header;
