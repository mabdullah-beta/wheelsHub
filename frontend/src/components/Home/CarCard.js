// src/components/CarCard.js

import React from "react";
import { Box, Card, IconButton, Typography, Chip, Button } from "@mui/joy";
import { Heart, Car } from "lucide-react";

const CarCard = ({ carData, onLikeToggle }) => {
  const handleLikeToggle = () => {
    onLikeToggle(carData.id); // Assuming this function updates the state
  };
  return (
    <Card variant="outlined">
      <Box sx={{ position: "relative" }}>
        <IconButton
          size="sm"
          variant="soft"
          onClick={handleLikeToggle}
          sx={{
            position: "absolute",
            top: 0,
            right: 8,
            zIndex: 1,
            bgcolor: "transparent",
            "&:hover": {
              bgcolor: "transparent",
            },
            color: carData.liked ? "danger.500" : "neutral.500",
          }}
        >
          <Heart fill={carData.liked ? "currentColor" : "none"} />
        </IconButton>
      </Box>
      <Box display={"flex"} sx={{ position: "relative", p: 2 }}>
        <img
          src={carData.image}
          alt={carData.name}
          style={{
            width: "80%",
            height: "auto",
            objectFit: "cover",
            margin: "20px auto",
            alignContent: "center",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 35,
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%",
            height: "30%",
            background:
              "linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)",
            zIndex: 1,
          }}
        />
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography level="h6">{carData.name}</Typography>
        <Typography level="body2" sx={{ mb: 1 }}>
          2023
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <Chip size="sm" variant="soft">
            <Car size={14} /> Manual
          </Chip>
          <Chip size="sm" variant="soft">
            Petrol
          </Chip>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography level="h6">${carData.price.toLocaleString()}</Typography>
          <Button size="sm">Buy Now</Button>
        </Box>
      </Box>
    </Card>
  );
};

export default CarCard;
