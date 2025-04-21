import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import loginImg from "../images/login-image.png";
import { Button, TextField } from "@mui/material";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    login(() => navigate("/"));
    // if (username === "admin" && password === "password") {
    //   setError("");
    //   login(() => navigate("/"));
    // } else {
    //   setError("Invalid username or password");
    // }
  };

  return (
    <div className="flex-container login-container">
      <div className="flex-1 flex-right">
        <img src={loginImg} className="login-img" />
      </div>
      <div className="flex-1 ">
        <form onSubmit={handleLogin} className="flex-row-container">
          <h4 className="login-hello">Hello,</h4>
          <h1 className="login-welcome">Welcome</h1>

          <div className="input-box">
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              helperText="Use 'admin' as the username"
            />
          </div>

          <div className="input-box">
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText="Use 'password' as the password"
            />
          </div>

          {error && (
            <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
          )}

          <Button variant="contained" type="submit" className="red">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
