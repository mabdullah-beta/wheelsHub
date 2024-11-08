// src/components/PageWrapper.js
import React from "react";
import { Box } from "@mui/joy";

const PageWrapper = ({ children }) => {
  return (
    <Box
      sx={{
        maxWidth: "100%",
        mx: "auto",
        padding: { xs: "10px 20px", md: "10px 60px" },
        bgcolor: "#F6F7F9",
      }}
    >
      {children}
    </Box>
  );
};

export default PageWrapper;
