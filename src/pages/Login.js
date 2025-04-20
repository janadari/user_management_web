import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    login(() => navigate("/"));
  };

  return (
    <div>
      <h1>Login Page here</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
