// src/components/PromotionalCard.js

import React from "react";
import { Card, Typography, Button, Box } from "@mui/joy";
import themes from "../../themes";

const PromotionalCard = () => {
  return (
    <Card
      variant="soft"
      sx={{
        bgcolor: themes.colors.primary,
        color: "white", // Ensure the Card's base text color is set
        p: 4,
        textAlign: "start",
        display: "flex",
        justifyContent: "center", // Center content horizontally
      }}
    >
      <Box
        sx={{
          width: "30%", // Limit content to 30% of the card width
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography level="h4" sx={{ mb: 1, color: "white" }}>
          Your trusted car marketplace.
        </Typography>
        <Typography sx={{ mb: 2, color: "white" }}>
          Providing reliable car buying and selling services with
          <br />
          secure and verified transactions
        </Typography>
        <Button
          variant="solid"
          sx={{
            width: "120px", // Width as per Figma design
            height: "44px", // Height as per Figma design
            bgcolor: "white",
            borderRadius: "12px",
            padding: "0 20px",
            transition: "all 0.3s ease",
            color: themes.colors.primary,
            "&:hover": {
              bgcolor: "lightgray",
            },
          }}
        >
          Select Car
        </Button>
      </Box>
    </Card>
  );
};

export default PromotionalCard;
