// Import core libraries and modules
import React from "react";
import ReactDOM from "react-dom/client";

// Import global CSS styles
import "./index.css";

// Import the main App component
import App from "./App";

// Import ThemeProvider for applying custom themes
import { ThemeProvider } from "@mui/joy/styles";

// Import the custom theme configuration
import themes from "./themes";

// Create root element for rendering the application
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application within the ThemeProvider
root.render(
  
  // Apply custom theme to the app
  <ThemeProvider theme={themes}> 
    
    <App /> {/* Main app component */}
  
  </ThemeProvider>

);