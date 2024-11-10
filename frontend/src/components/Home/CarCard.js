import React from "react";
import { Box, Card, IconButton, Typography, Chip, Button } from "@mui/joy";
import { Heart, Car } from "lucide-react";
import { ReactComponent as Transmission } from "../../assets/Transmission.svg";
import { ReactComponent as PeopleIcon } from "../../assets/peopleIcon.svg";
import { ReactComponent as GasolineIcon } from "../../assets/gasolineIcon.svg";

const CarCard = ({ carData, onLikeToggle }) => {
  const handleLikeToggle = () => {
    onLikeToggle(carData.id); // Assuming this function updates the state
  };

  return (
    <Card variant="outlined" sx={{ p: 3 }}>
      <Box sx={{ mb: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography level="h4">{carData.name}</Typography>
          <IconButton
            size="sm"
            variant="soft"
            onClick={handleLikeToggle}
            sx={{
              bgcolor: "transparent",
              "&:hover": { bgcolor: "transparent" },
              color: carData.liked ? "danger.500" : "neutral.500",
            }}
          >
            <Heart fill={carData.liked ? "currentColor" : "none"} />
          </IconButton>
        </Box>

        <Typography level="body2" sx={{ textTransform: "capitalize" }}>
          {carData.type}
        </Typography>
      </Box>

      <Box sx={{ position: "relative", display: "flex", mb: 2 }}>
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",

          mb: 2,
          rowGap: 1,
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <Chip
          sx={{
            display: "flex",
            alignItems: "center",

            p: 0,
            bgcolor: "transparent",
          }}
          size="md"
          variant="soft"
        >
          <GasolineIcon
            style={{ width: 20, height: 20, verticalAlign: "middle" }}
          />

          {carData.tankcapacity}
        </Chip>
        <Chip
          sx={{
            display: "flex",
            alignItems: "center",
            p: 0,

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
        <Chip
          sx={{
            display: "flex",
            alignItems: "center",
            p: 0,

            bgcolor: "transparent",
          }}
          size="md"
          variant="soft"
        >
          <PeopleIcon
            style={{ width: 20, height: 20, verticalAlign: "middle" }}
          />
          {carData.seatingCapacity} People
        </Chip>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography level="h4">${carData.price.toLocaleString()}</Typography>
        <Button size="sm">Buy Now</Button>
      </Box>
    </Card>
  );
};

export default CarCard;
