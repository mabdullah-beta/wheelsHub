import React from "react";
import { Box, Card, IconButton, Typography, Chip, Button } from "@mui/joy";
import { Heart, Car } from "lucide-react";
import { ReactComponent as Transmission } from "../../assets/Transmission.svg";

const CarCard = ({ carData, onLikeToggle }) => {
  const handleLikeToggle = () => {
    onLikeToggle(carData.id); // Assuming this function updates the state
  };

  return (
    <Card variant="outlined">
      {/* First row: Car name and heart icon */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ p: 2 }}
      >
        <Typography level="h4">{carData.name}</Typography>
        <IconButton
          size="sm"
          variant="soft"
          onClick={handleLikeToggle}
          sx={{
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

      {/* Second row: Car image with gradient */}
      <Box sx={{ position: "relative", display: "flex" }}>
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
            bottom: 23,
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

      {/* Third row: Car details - fuel, people capacity, and transmission */}
      <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
        <Chip
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: "transparent",
          }}
          size="md"
          variant="soft"
        >
          <Transmission
            style={{ width: 20, height: 20, verticalAlign: "middle" }}
          />

          {carData.transmission}
        </Chip>
        <Chip size="md" variant="soft" sx={{ bgcolor: "transparent" }}>
          {carData.fuelType}
        </Chip>
        <Chip size="md" variant="soft" sx={{ bgcolor: "transparent" }}>
          {carData.seatingCapacity} Seats
        </Chip>
      </Box>

      {/* Fourth row: Price and Buy Now button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography level="h4">${carData.price.toLocaleString()}</Typography>
        <Button size="sm">Buy Now</Button>
      </Box>
    </Card>
  );
};

export default CarCard;
