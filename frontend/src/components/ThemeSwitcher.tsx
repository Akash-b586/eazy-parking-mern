import { ThemeContext } from "@/context/ThemeContext";
import { SpeedDial } from "@mui/material";
import { Moon, Sun } from "lucide-react";
import { useContext } from "react";

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useContext(ThemeContext)
  
    return (
      <SpeedDial
        ariaLabel="Theme Switcher"
        icon={theme === 'dark' ? <Moon /> : <Sun />}
        sx={{ position: 'fixed', bottom: 16, right: 16, color: 'purple' }}
        onClick={toggleTheme}
      />
    )
  }

export default ThemeSwitcher;