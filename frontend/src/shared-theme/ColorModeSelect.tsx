import { useEffect, useContext } from "react";
import { useColorScheme } from "@mui/material/styles";
import { ThemeContext } from "@/context/ThemeContext";

export default function ColorModeSelect() {
  const { mode, setMode } = useColorScheme();
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    if (theme && setMode) {
      setMode(theme as "light" | "dark" | "system");
    }
  }, [theme, setMode]);

  if (!mode) {
    return null;
  }

  return <></>;
}
