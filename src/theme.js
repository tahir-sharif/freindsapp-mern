import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0073c3",
      50: "#eeeeee",
    },
    secondary: {
      main: "#9f9f9f",
      50: "#4a4a4a",
    },
  },
  shape: {
    borderRadius: 10,
  },
});
