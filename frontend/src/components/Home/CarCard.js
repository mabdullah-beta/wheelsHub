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
          <Typography level="h4">{carData.title}</Typography>
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
          {carData.body_type}
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 0,
            gap: 0.5,

            bgcolor: "transparent",
          }}
        >
          <GasolineIcon style={{ width: 24, height: 24 }} />
          <Typography
            level="body2"
            textTransform="capitalize"
            sx={{ fontWeight: "600" }}
          >
            {carData.gasoline}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 0,
            gap: 0.5,

            bgcolor: "transparent",
          }}
        >
          <Transmission style={{ width: 24, height: 24 }} />
          <Typography
            level="body2"
            textTransform="capitalize"
            sx={{ fontWeight: "600" }}
          >
            {carData.transmission}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 0,
            gap: 0.5,

            bgcolor: "transparent",
          }}
        >
          <PeopleIcon style={{ width: 24, height: 24 }} />
          <Typography
            level="body2"
            textTransform="capitalize"
            sx={{ fontWeight: "600" }}
          >
            {carData.people} People
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography level="h4">${carData.price.toLocaleString()}</Typography>
        <Button
          size="sm"
          sx={{
            alignItems: "start",
            justifyContent: "center",
            transition: "all 0.3s ease",
          }}
        >
          Buy Now
        </Button>
      </Box>
    </Card>
  );
};

export default CarCard;
