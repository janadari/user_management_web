import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/Routes";
import { AuthProvider } from "./auth/AuthProvider";
import { ThemeProvider } from "./theme/ThemeProvider";
import Header from "./components/Header";
import SideBar from "components/SideBar";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Header />
          <div style={{ display: "flex" }}>
            <SideBar />
            <AppRoutes />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
