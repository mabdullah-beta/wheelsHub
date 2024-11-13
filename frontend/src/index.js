import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@mui/joy/styles"; // Import the ThemeProvider
import themes from "./themes"; // Import your custom themes file

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <ThemeProvider theme={themes}>
      <App />
    </ThemeProvider>
);
