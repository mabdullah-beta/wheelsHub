import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  colors: {
    primary: "#3563E9",
    secondary: "#FF5733",
    headingPrimary: "#2C3E50",
    headingSecondary: "#7F8C8D",
    backgroundColor: "#F6F7F9",
  },

  fonts: {
    main: "Plus Jakarta Sans Regular, sans-serif",
    regular: "Plus Jakarta Sans Regular, sans-serif",
    bold: "Plus Jakarta Sans Bold, sans-serif",
    medium: "Plus Jakarta Sans Medium, sans-serif",
  },

  typography: {
    fontFamily: `"Plus Jakarta Sans", sans-serif`,
    h2: {
      fontFamily: `"Plus Jakarta Sans", sans-serif`,
      fontSize: "32px",
      fontWeight: 700,
      color: "#1A202C",
    },
    h4: {
      fontFamily: `"Plus Jakarta Sans", sans-serif`,
      fontSize: "20px",
      fontWeight: 700,
      color: "#1A202C",
    },
    h6: {
      fontFamily: `"Plus Jakarta Sans", sans-serif`,
      fontSize: "1.25rem",
      fontWeight: 500,
      color: "#7F8C8D",
    },
    body1: {
      fontFamily: `"Plus Jakarta Sans", sans-serif`,
      fontSize: "1rem",
      fontWeight: 400,
      color: "#333",
    },
    body2: {
      fontFamily: `"Plus Jakarta Sans", sans-serif`,
      fontSize: "14px",
      fontWeight: 400,
      color: "#90A3BF",
    },
    label: {
      fontSize: "14px",
      fontWeight: 500,
      color: "#2C3E50",
    },
  },

  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: `"Plus Jakarta Sans", sans-serif`,
          fontSize: "12px", // Set a default font size for inputs
          color: "#333", // Default text color for inputs
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontFamily: `"Plus Jakarta Sans", sans-serif`,
          fontSize: "16px", // Default font size for selects
          color: "#333", // Default text color for selects
        },
      },
    },
  },
});

export default theme;
