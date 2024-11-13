import { createTheme } from "@mui/material/styles";

// Define the custom theme for Material-UI components
const theme = createTheme({

  // Define color palette for the application
  colors: {

    // Primary theme color
    primary: "#3563E9",       

    // Secondary accent color
    secondary: "#FF5733",      

    // Main heading color
    headingPrimary: "#2C3E50", 

    // Secondary heading color
    headingSecondary: "#7F8C8D", 

    // Background color for components/pages
    backgroundColor: "#F6F7F9"

  },

  // Define font families and weights
  fonts: {

    main: "Plus Jakarta Sans Regular, sans-serif",
    regular: "Plus Jakarta Sans Regular, sans-serif",
    bold: "Plus Jakarta Sans Bold, sans-serif",
    medium: "Plus Jakarta Sans Medium, sans-serif"

  },

  // Define typography settings for different text elements
  typography: {

    // Global font family for the app
    fontFamily: `"Plus Jakarta Sans", sans-serif`, 

    // Heading 2 style
    h2: {

      fontSize: "32px",
      fontWeight: 700,
      color: "#1A202C"

    },

    // Heading 4 style
    h4: {

      fontSize: "20px",
      fontWeight: 700,
      color: "#1A202C"

    },

    // Heading 6 style
    h6: {

      fontSize: "1.25rem",
      fontWeight: 500,
      color: "#7F8C8D"

    },

    // Body text style for general text
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      color: "#90A3BF",
    },

    // Body text style for smaller descriptions
    body2: {

      fontSize: "14px",
      fontWeight: 400,
      color: "#90A3BF"

    },

    // Smaller text style for labels or notes
    body3: {

      fontSize: "12px",
      fontWeight: 600,
      color: "#333333"

    },

    // Label text style
    label: {

      fontSize: "14px",
      fontWeight: 500,
      color: "#2C3E50"

    },
  },

  // Custom component overrides for Material-UI components
  components: {

    // Input base style override
    MuiInputBase: {

      styleOverrides: {

        root: {

          // Default font size for inputs
          fontSize: "12px", 

          // Default text color for inputs
          color: "#333"

        }

      }

    },

    // Select component style override
    MuiSelect: {

      styleOverrides: {

        root: {

          // Default font size for selects
          fontSize: "16px", 

          // Default text color for selects
          color: "#333"
        }

      }

    }

  }

});

export default theme;