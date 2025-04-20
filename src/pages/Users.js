import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import ThemeSwitcher from "../components/ThemeSwitcher";

function Users() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout(() => navigate("/login"));
  };

  return (
    <div>
      <h1> User list here</h1>
    </div>
  );
}

export default Users;
