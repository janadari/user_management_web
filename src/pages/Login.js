import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import loginImg from "../images/login-img.png";
import { Button, TextField } from "@mui/material";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    login(() => navigate("/"));
  };

  return (
    <div className="flex-container login-container">
      <div className="flex-1 flex-right">
        <img src={loginImg} />
      </div>
      <div className="flex-1 ">
        <div className="flex-row-container">
          <h4 className="login-hello">Hello,</h4>
          <h1 className="login-welcome">Welcome</h1>

          <div className="input-box">
            <TextField
              fullWidth
              id="outlined-basic"
              label="username"
              variant="outlined"
              helperText="use admin as the username"
            />
          </div>

          <div className="input-box">
            <TextField
              fullWidth
              id="outlined-basic"
              label="password"
              variant="outlined"
              helperText="use password as the username"
            />
          </div>

          <Button variant="contained" onClick={handleLogin} className="red">
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
