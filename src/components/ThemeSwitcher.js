import React, { useContext } from "react";
import { ThemeContext } from "../theme/ThemeProvider";
import { Button } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={{ marginRight: "10px" }}>
      {theme === "light" ? (
        <Button
          variant="outlined"
          onClick={toggleTheme}
          startIcon={<DarkModeIcon />}
        >
          Dark Mode
        </Button>
      ) : (
        <Button
          variant="outlined"
          onClick={toggleTheme}
          startIcon={<LightModeIcon />}
        >
          Light Mode
        </Button>
      )}
    </div>
  );
};

export default ThemeSwitcher;
